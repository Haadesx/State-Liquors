import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/shared/product-card";
import { FilterSidebar } from "@/components/shared/filter-sidebar";

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
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0 hidden md:block">
                    <Suspense fallback={<div>Loading filters...</div>}>
                        <FilterSidebar />
                    </Suspense>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold tracking-tight capitalize">
                            {category ? category : "All Products"}
                        </h1>
                        <p className="text-muted-foreground">
                            {products.length} {products.length === 1 ? 'result' : 'results'} found
                        </p>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <h3 className="text-lg font-semibold">No products found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters or search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
