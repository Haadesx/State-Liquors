import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { AddToCart } from "@/components/product/add-to-cart";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container px-4 md:px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                {/* Gallery */}
                <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border">
                    {product.images[0] && product.images[0] !== "/placeholder.jpg" ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl">🍾</div>
                    )}
                    {product.compareAtPrice && (
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-red-600 text-lg px-3 py-1">Sale</Badge>
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-lg font-medium text-muted-foreground mb-2">{product.brand}</h2>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{product.name}</h1>
                    </div>

                    <div className="flex items-end gap-4">
                        <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                        {product.compareAtPrice && (
                            <span className="text-xl text-muted-foreground line-through mb-1">${product.compareAtPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <div className="prose prose-gray dark:prose-invert">
                        <p>{product.description || "No description available."}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col border p-3 rounded-md">
                            <span className="text-muted-foreground">Category</span>
                            <span className="font-medium capitalize">{product.category}</span>
                        </div>
                        <div className="flex flex-col border p-3 rounded-md">
                            <span className="text-muted-foreground">Type</span>
                            <span className="font-medium capitalize">{product.subCategory}</span>
                        </div>
                        {product.abv && (
                            <div className="flex flex-col border p-3 rounded-md">
                                <span className="text-muted-foreground">ABV</span>
                                <span className="font-medium">{product.abv}%</span>
                            </div>
                        )}
                        {product.size && (
                            <div className="flex flex-col border p-3 rounded-md">
                                <span className="text-muted-foreground">Size</span>
                                <span className="font-medium">{product.size}</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-6 border-t mt-auto">
                        <AddToCart product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
