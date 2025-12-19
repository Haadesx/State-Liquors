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
        <div className="group relative border rounded-lg bg-card overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
            <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-muted overflow-hidden">
                {product.images[0] && product.images[0] !== "/placeholder.jpg" ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">🍾</div>
                )}
                {!product.inStock && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                )}
                {product.compareAtPrice && (
                    <div className="absolute top-2 left-2">
                        <Badge className="bg-red-600">Sale</Badge>
                    </div>
                )}
            </Link>
            <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="text-sm text-muted-foreground capitalize">{product.brand}</div>
                <Link href={`/product/${product.slug}`} className="font-semibold leading-tight hover:underline line-clamp-2">
                    {product.name}
                </Link>
                <div className="flex items-center gap-2 mt-auto pt-2">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                        {product.compareAtPrice && (
                            <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                        )}
                    </div>
                    <Button size="icon" className="ml-auto shrink-0" disabled={!product.inStock} onClick={handleAddToCart}>
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Add to cart</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
