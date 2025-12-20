"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { CartDrawer } from "@/components/shared/cart-drawer";
import { useDebounce } from "@/hooks/use-debounce";

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Sync local state with URL param on mount/change
    const initialSearch = searchParams.get("search") || "";
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const debouncedSearch = useDebounce(searchQuery, 500);

    // Sync state if URL changes externally (e.g. back button)
    useEffect(() => {
        if (searchParams.get("search") !== searchQuery && searchParams.get("search") !== null) {
            setSearchQuery(searchParams.get("search") || "");
        }
    }, [searchParams]);

    useEffect(() => {
        // Only navigate if the debounced value is different from current URL param
        // and if the user has typed something (to avoid initial mount trigger if empty)
        // Note: This simple logic might trigger on every keystroke after delay.
        // Ideally we check if we are already on /shop.

        if (debouncedSearch !== (searchParams.get("search") || "")) {
            if (debouncedSearch) {
                router.push(`/shop?search=${encodeURIComponent(debouncedSearch)}`);
            } else {
                // If cleared, remove param or just stay on shop page without search
                // Only if we are already on shop page
                if (window.location.pathname === '/shop') {
                    router.push('/shop');
                }
            }
        }
    }, [debouncedSearch, router, searchParams]);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-4 py-4">
                            <Link href="/" className="text-lg font-semibold">
                                Home
                            </Link>
                            <Link href="/shop" className="text-lg font-semibold">
                                Shop
                            </Link>
                            <Link href="/shop?category=spirits" className="text-lg font-semibold pl-4 text-muted-foreground">
                                Spirits
                            </Link>
                            <Link href="/shop?category=wine" className="text-lg font-semibold pl-4 text-muted-foreground">
                                Wine
                            </Link>
                            <Link href="/shop?category=beer" className="text-lg font-semibold pl-4 text-muted-foreground">
                                Beer
                            </Link>
                            <Link href="/shop?category=seltzers" className="text-lg font-semibold pl-4 text-muted-foreground">
                                Seltzers
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    {/* <span className="text-xl font-bold tracking-tight">State Liquors</span> */}
                    <img src="/logo.jpeg" alt="State Liquors" className="h-12 w-auto object-contain" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/shop" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Shop
                    </Link>
                    <Link href="/shop?category=spirits" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Spirits
                    </Link>
                    <Link href="/shop?category=wine" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Wine
                    </Link>
                    <Link href="/shop?category=beer" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Beer
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center space-x-2">
                    <div className="relative hidden md:flex items-center w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-64 pl-8 h-9 rounded-md bg-muted/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <Search className="h-5 w-5" />
                    </Button>

                    <CartDrawer />
                </div>
            </div>
            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="md:hidden p-4 border-t">
                    <div className="relative flex items-center w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            )}
        </header>
    );
}
