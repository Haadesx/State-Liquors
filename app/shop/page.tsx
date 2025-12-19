import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import { ProductGridAnimated } from "@/components/shop/product-grid-animated";
import { FilterSheet } from "@/components/shop/filter-sheet";

interface ShopPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const category = typeof params.category === "string" ? params.category : undefined;
    const search = typeof params.search === "string" ? params.search : undefined;

    const products = await getProducts({ category, search });

    return (
        <div className="container px-4 md:px-6 py-8">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 gap-4 border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight capitalize mb-1">
                        {category ? category : search ? `Search: ${search}` : "All Products"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {products.length} {products.length === 1 ? 'result' : 'results'} found
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <FilterSheet />
                    {/* Sort Dropdown could go here */}
                </div>
            </div>

            {products.length > 0 ? (
                <ProductGridAnimated products={products} />
            ) : (
                <div className="py-20 text-center">
                    <h3 className="text-lg font-semibold">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search.</p>
                </div>
            )}
        </div>
    );
}
