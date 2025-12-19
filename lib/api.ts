import { MOCK_PRODUCTS, CATEGORIES } from "./mock-data";
import { Product } from "./schemas";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts(options?: {
    category?: string;
    search?: string;
}): Promise<Product[]> {
    await delay(300); // Simulate network latency

    let products = [...MOCK_PRODUCTS];

    if (options?.category) {
        products = products.filter((p) => p.category === options.category);
    }

    if (options?.search) {
        const q = options.search.toLowerCase();
        products = products.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
        );
    }

    return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    await delay(200);
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export async function getCategories() {
    await delay(100);
    return CATEGORIES;
}

export async function getRelatedProducts(productId: string): Promise<Product[]> {
    await delay(200);
    const original = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!original) return [];

    return MOCK_PRODUCTS.filter(
        (p) => p.category === original.category && p.id !== original.id
    ).slice(0, 4);
}
