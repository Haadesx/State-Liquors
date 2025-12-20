"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();
        addItem(product);
    };

    return (
        <div className="group relative border border-border/50 rounded-xl bg-card overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
            <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] bg-muted overflow-hidden">
                {product.images[0] && product.images[0] !== "/placeholder.jpg" ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">🍾</div>
                )}
                {!product.inStock && (
                    <div className="absolute top-3 right-3 z-10">
                        <Badge variant="destructive" className="shadow-sm">Out of Stock</Badge>
                    </div>
                )}
                {product.compareAtPrice && (
                    <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-chart-1 hover:bg-chart-1 text-white shadow-sm border-none">Sale</Badge>
                    </div>
                )}

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent pt-10 flex justify-center">
                    <Button
                        size="sm"
                        className="w-full bg-white text-black hover:bg-white/90 font-bold shadow-lg"
                        disabled={!product.inStock}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                    </Button>
                </div>
            </Link>
            <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{product.brand}</div>
                <Link href={`/product/${product.slug}`} className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 text-lg">
                    {product.name}
                </Link>
                <div className="flex items-center gap-2 mt-auto pt-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                        {product.compareAtPrice && (
                            <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
