import os
import time
import json
import requests
import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

# Configuration
URL = "https://www.doordash.com/convenience/store/33945617?event_type=autocomplete&pickup=false"
OUTPUT_DIR = "../public/products"
MOCK_DATA_FILE = "../lib/mock-data.ts"

def setup_driver():
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless") # Commented out to allow manual captcha solving
    path = ChromeDriverManager().install()
    print(f"Driver downloaded to: {path}")
    
    # Fix for WinError 193: Ensure we point to the .exe
    if not path.endswith(".exe"):
        # If it's a directory or other file, find the exe
        base_dir = os.path.dirname(path)
        print(f"Searching for chromedriver.exe in {base_dir}...")
        for root, dirs, files in os.walk(base_dir):
            if "chromedriver.exe" in files:
                path = os.path.join(root, "chromedriver.exe")
                break
    
    print(f"Using executable: {path}")
    service = Service(path)
    driver = webdriver.Chrome(service=service, options=options)
    return driver

def clean_filename(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

def download_image(url, filename):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    
    path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(path):
        return f"/products/{filename}"
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(path, 'wb') as f:
                f.write(response.content)
            return f"/products/{filename}"
    except Exception as e:
        print(f"Failed to download {url}: {e}")
    return None

def main():
    driver = setup_driver()
    try:
        print(f"Navigating to {URL}...")
        driver.get(URL)
        
        print("\n" + "="*50)
        print("ACTION REQUIRED: Please interact with the browser window.")
        print("1. Solve any captchas.")
        print("2. Scroll down to load all products you want to scrape.")
        print("3. Click 'See all' on categories if needed.")
        print("="*50 + "\n")
        
        input("Press Enter here when you are ready to scrape...")
        
        print("Scraping items...")
        
        # DoorDash selectors are tricky/obfuscated. We'll try a generic approach finding cards.
        # Looking for elements that contain an image and a price.
        
        products = []
        
        # This is a heuristic. We look for commonly used containers for products.
        # You might need to adjust 'div[data-anchor-id]' or general classes if DD updates.
        # Strategy: Find all images, then check parent for price text.
        
        # Method 2: Look for product cards by price
        # Prices usually start with $
        price_elements = driver.find_elements(By.XPATH, "//*[contains(text(), '$')]")
        
        seen_names = set()
        
        for price_el in price_elements:
            try:
                price_text = price_el.text.strip()
                if not re.match(r'^\$\d+(\.\d{2})?$', price_text):
                    continue
                
                # Assume this is a product card. Traverse up to find the container.
                # Usually: Container -> [Image, Info -> [Name, Price]]
                
                # Go up a few levels to find the card container
                container = price_el
                for _ in range(6): # Traverse up 6 levels max
                    container = container.find_element(By.XPATH, "..")
                    # Check if this container has an image
                    imgs = container.find_elements(By.TAG_NAME, "img")
                    if imgs:
                        # Found a potential card
                        img_url = imgs[0].get_attribute("src")
                        
                        # Find name: usually the text with the most characters that isn't the price
                        texts = container.text.split('\n')
                        name = ""
                        for t in texts:
                            if t.strip() != price_text and len(t) > 3 and "$" not in t:
                                name = t
                                break
                        
                        if name and name not in seen_names:
                            print(f"Found: {name} - {price_text}")
                            seen_names.add(name)
                            
                            slug = clean_filename(name)
                            image_filename = f"{slug}.jpg"
                            
                            # Download image
                            local_image_path = download_image(img_url, image_filename)
                            
                            # Guess category
                            category = "beer" # Default
                            if "vodka" in name.lower() or "whiskey" in name.lower():
                                category = "spirits"
                            elif "wine" in name.lower() or "cabernet" in name.lower():
                                category = "wine"
                            elif "seltzer" in name.lower():
                                category = "seltzer"
                                
                            products.append({
                                "id": slug,
                                "slug": slug,
                                "name": name,
                                "brand": "Unknown", # Hard to parse without specific selector
                                "category": category,
                                "subCategory": "misc",
                                "price": float(price_text.replace('$','')),
                                "size": "Standard",
                                "abv": 0,
                                "images": [local_image_path] if local_image_path else [],
                                "inStock": True,
                                "isAlcohol": True,
                                "variants": [],
                                "tags": []
                            })
                        break
            except Exception as e:
                continue

        print(f"Scraped {len(products)} products.")
        
        # Generate TypeScript output
        ts_content = """import { Product } from "./schemas";

export const CATEGORIES = [
    { slug: "ready-to-drink", name: "Ready to Drink" },
    { slug: "beer", name: "Beer" },
    { slug: "spirits", name: "Spirits" },
    { slug: "wine", name: "Wine" },
    { slug: "seltzer", name: "Seltzers" },
] as const;

export const MOCK_PRODUCTS: Product[] = """ + json.dumps(products, indent=4) + ";"
        
        with open(MOCK_DATA_FILE, "w", encoding='utf-8') as f:
            f.write(ts_content)
            
        print(f"Updated {MOCK_DATA_FILE}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
