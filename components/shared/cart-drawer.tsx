"use client";

import { useCartStore } from "@/store/use-cart-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function CartDrawer() {
    const { items, removeItem, updateQty, subtotal, totalItems } = useCartStore();
    const [isOpen, setIsOpen] = useState(false);

    // Hydration fix for Persist
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);

    const total = subtotal();
    const count = totalItems();

    if (!hydrated) {
        return (
            <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Cart</span>
                    {count > 0 && (
                        <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                            {count > 9 ? '9+' : count}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Shopping Cart ({count})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ShoppingCart className="h-12 w-12 opacity-20" />
                            <p>Your cart is empty</p>
                            <Button onClick={() => setIsOpen(false)} variant="secondary">Start Shopping</Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.productId} className="flex gap-4">
                                    <div className="relative h-20 w-20 bg-muted rounded overflow-hidden shrink-0 border">
                                        {item.product?.images[0] ? (
                                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-2xl">🍾</div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 gap-1">
                                        <h4 className="font-semibold text-sm line-clamp-2">{item.product?.name}</h4>
                                        <p className="text-sm text-muted-foreground">${item.unitPrice.toFixed(2)}</p>
                                        <div className="flex items-center gap-2 mt-auto">
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQty(item.productId, item.qty - 1)}>
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-sm w-4 text-center">{item.qty}</span>
                                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQty(item.productId, item.qty + 1)}>
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.productId)}>
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Taxes and shipping calculated at checkout.</p>
                        <Button className="w-full" size="lg" asChild onClick={() => setIsOpen(false)}>
                            <Link href="/checkout">Checkout</Link>
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
