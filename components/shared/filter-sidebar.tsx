"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
    { name: "All Products", slug: undefined },
    { name: "Spirits", slug: "spirits" },
    { name: "Wine", slug: "wine" },
    { name: "Beer", slug: "beer" },
    { name: "Seltzers", slug: "seltzers" },
];

export function FilterSidebar() {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");

    return (
        <div className="space-y-4">
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Categories
                </h2>
                <div className="space-y-1">
                    {CATEGORIES.map((category) => (
                        <Button
                            key={category.name}
                            variant={currentCategory === category.slug || (!currentCategory && !category.slug) ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link
                                href={category.slug ? `/shop?category=${category.slug}` : "/shop"}
                            >
                                {category.name}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Filters
                </h2>
                {/* Placeholder for Price/Brand filters */}
                <div className="px-4 text-sm text-muted-foreground">
                    Price Range (Coming Soon) <br />
                    Brand (Coming Soon)
                </div>
            </div>
        </div>
    );
}
