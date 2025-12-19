import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/lib/schemas";

interface CartState {
    items: CartItem[];
    addItem: (product: Product, qty?: number) => void;
    removeItem: (productId: string) => void;
    updateQty: (productId: string, qty: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    subtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, qty = 1) => {
                const items = get().items;
                const existingItem = items.find((i) => i.productId === product.id);

                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.productId === product.id
                                ? { ...i, qty: i.qty + qty }
                                : i
                        ),
                    });
                } else {
                    set({
                        items: [
                            ...items,
                            {
                                productId: product.id,
                                qty,
                                unitPrice: product.price,
                                product: product, // Store full product object for UI simplicity
                            },
                        ],
                    });
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i.productId !== productId) });
            },
            updateQty: (productId, qty) => {
                if (qty <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.productId === productId ? { ...i, qty } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            totalItems: () => get().items.reduce((acc, item) => acc + item.qty, 0),
            subtotal: () =>
                get().items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0),
        }),
        {
            name: "cart-storage",
        }
    )
);
