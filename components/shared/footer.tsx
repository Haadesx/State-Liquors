export function Footer() {
    return (
        <footer className="border-t bg-muted/20">
            <div className="container py-10 md:py-16 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">State Liquors</h3>
                        <p className="text-sm text-muted-foreground">
                            Premium spirits, wine, and beer.
                            <br />
                            Delivered to your door.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="/shop?category=spirits" className="hover:underline">Spirits</a></li>
                            <li><a href="/shop?category=wine" className="hover:underline">Wine</a></li>
                            <li><a href="/shop?category=beer" className="hover:underline">Beer</a></li>
                            <li><a href="/shop" className="hover:underline">All Products</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                            <li><a href="/faq" className="hover:underline">FAQs</a></li>
                            <li><a href="/policies/returns" className="hover:underline">Returns</a></li>
                            <li><a href="/policies/privacy" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Store</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                            123 Main Street<br />
                            New York, NY 10001
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Mon-Sat: 10am - 9pm<br />
                            Sun: 12pm - 6pm
                        </p>
                    </div>
                </div>
                <div className="mt-10 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} State Liquors. All rights reserved. 21+ only.
                </div>
            </div>
        </footer>
    );
}
