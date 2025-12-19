"use client";

import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CheckoutPage() {
    const { items, subtotal } = useCartStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const total = subtotal();
    const shipping = 15.00;
    const tax = total * 0.08875; // NYC Tax approx
    const grandTotal = total + shipping + tax;

    if (!hydrated) return null;

    if (items.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button asChild>
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container px-4 md:px-6 py-10">
            <Link href="/shop" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue Shopping
            </Link>
            <div className="grid lg:grid-cols-2 gap-10">
                {/* Left Column: Form */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                        <Input placeholder="Email or mobile phone number" className="mb-2" />
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="news" className="rounded border-gray-300" />
                            <Label htmlFor="news" className="text-sm font-normal">Email me with news and offers</Label>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <Label>First name</Label>
                                <Input placeholder="First name" />
                            </div>
                            <div className="space-y-2">
                                <Label>Last name</Label>
                                <Input placeholder="Last name" />
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <Label>Address</Label>
                            <Input placeholder="Address" />
                        </div>
                        <div className="space-y-2 mb-4">
                            <Label>Apartment, suite, etc. (optional)</Label>
                            <Input placeholder="" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input placeholder="City" />
                            </div>
                            <div className="space-y-2">
                                <Label>State</Label>
                                <Input placeholder="State" />
                            </div>
                            <div className="space-y-2">
                                <Label>ZIP code</Label>
                                <Input placeholder="ZIP code" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Payment</h2>
                        <div className="bg-muted p-4 rounded-md text-sm text-muted-foreground border">
                            This store accepts payments via secure platform.
                            Payment gateway UI would appear here.
                        </div>
                        {/* Visual placeholder for credit card form */}
                        <div className="mt-4 space-y-4 opacity-50 pointer-events-none">
                            <Input placeholder="Card number" />
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Expiration date (MM / YY)" />
                                <Input placeholder="Security code" />
                            </div>
                            <Input placeholder="Name on card" />
                        </div>
                    </div>

                    <Button size="lg" className="w-full text-lg h-12">Pay Now</Button>
                </div>

                {/* Right Column: Order Summary */}
                <div className="bg-muted/30 p-6 rounded-lg self-start sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {items.map((item) => (
                            <div key={item.productId} className="flex gap-4">
                                <div className="relative h-16 w-16 bg-white rounded border overflow-hidden shrink-0">
                                    <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-10">
                                        {item.qty}
                                    </div>
                                    {item.product?.images[0] ? (
                                        <Image src={item.product?.images[0]} alt={item.product?.name} fill className="object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-xl">🍾</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">{item.product?.name}</h4>
                                    <p className="text-xs text-muted-foreground">{item.product?.size}</p>
                                </div>
                                <div className="text-sm font-medium">
                                    ${(item.qty * item.unitPrice).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t my-6 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Estimated taxes</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
