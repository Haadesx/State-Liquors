"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    images: string[];
}

interface TrendingCarouselProps {
    products: Product[];
}

export function TrendingCarousel({ products }: TrendingCarouselProps) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-chart-1/10 rounded-full">
                        <Flame className="w-6 h-6 text-chart-1 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
                        <p className="text-muted-foreground text-sm">Selling fast - don&apos;t miss out.</p>
                    </div>
                </div>
                <Link href="/shop" className="text-primary hover:underline font-medium flex items-center gap-1 group">
                    View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0">
                {products.slice(0, 6).map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-none w-[280px] snap-center"
                    >
                        <Link href={`/product/${product.slug}`} className="group block h-full">
                            <div className="relative border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-300 h-full hover:border-primary/50">

                                {/* Badges */}
                                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                    {index === 0 && (
                                        <span className="px-2 py-1 text-xs font-bold bg-chart-1 text-white rounded shadow-sm">
                                            #1 Best Seller
                                        </span>
                                    )}
                                    {index > 0 && index < 3 && (
                                        <span className="px-2 py-1 text-xs font-bold bg-chart-2 text-white rounded shadow-sm">
                                            Hot
                                        </span>
                                    )}
                                    {product.price > 50 && (
                                        <span className="px-2 py-1 text-xs font-bold bg-black/80 backdrop-blur-md text-white border border-white/20 rounded shadow-sm">
                                            Free Shipping
                                        </span>
                                    )}
                                </div>

                                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                        {product.images[0]?.startsWith('/') || product.images[0]?.startsWith('http') ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <span className="text-4xl">🥃</span>
                                        )}
                                    </div>

                                    {/* Quick Add Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent pt-10">
                                        <Button className="w-full bg-white text-black hover:bg-white/90 font-bold">
                                            Quick Add
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-4 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{product.brand}</p>
                                            <h3 className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-1">
                                        <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                                        {index % 2 === 0 && (
                                            <span className="text-xs text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</span>
                                        )}
                                    </div>

                                    {/* Stock Nudge */}
                                    {index < 3 && (
                                        <div className="flex items-center gap-1.5 pt-2">
                                            <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                                                <div className="h-full bg-chart-1 w-[80%] rounded-full" />
                                            </div>
                                            <span className="text-[10px] text-chart-1 font-medium whitespace-nowrap">Only 4 left</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
