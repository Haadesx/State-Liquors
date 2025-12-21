"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop"
          alt="Luxury Bar Background"
          fill
          className="object-cover opacity-60 scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
            Est. 2024
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white drop-shadow-lg">
            Elevate Your <br />
            <span className="text-primary">
              Spirits.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Curated collections of the world&apos;s finest liquors, wines, and craft beers. Delivered differently.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-5 pt-4"
        >
          <Link href="/shop">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-primary text-white hover:bg-primary/90 font-bold shadow-[0_0_20px_rgba(255,50,47,0.3)] hover:shadow-[0_0_35px_rgba(255,50,47,0.5)] transition-all transform hover:-translate-y-1">
              Shop Collection
            </Button>
          </Link>
          <Link href="/shop?category=whiskey">
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-white/30 bg-white/5 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all">
              Discover Whiskey
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
