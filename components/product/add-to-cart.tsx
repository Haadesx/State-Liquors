"use client";

import { useState } from "react";
import { Product } from "@/lib/schemas";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

export function AddToCart({ product }: { product: Product }) {
    const [qty, setQty] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem(product, qty);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <label htmlFor="qty" className="sr-only">Quantity</label>
                <div className="flex items-center border rounded-md">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        disabled={qty <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{qty}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQty(qty + 1)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
            </div>
        </div>
    );
}
