"use client";

import { useState } from "react";
import { X, Truck, Gift } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function PromoBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-primary text-black relative z-50"
            >
                <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-4 text-sm font-semibold">
                    <span className="hidden sm:flex items-center gap-1">
                        <Truck className="w-4 h-4" /> Free Shipping over $100
                    </span>
                    <span className="w-1 h-1 bg-black rounded-full hidden sm:block opacity-50" />
                    <span className="flex items-center gap-1">
                        <Gift className="w-4 h-4" /> Use code <span className="font-black bg-black text-primary px-1.5 py-0.5 rounded ml-1">GOLD20</span> for 20% off
                    </span>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
