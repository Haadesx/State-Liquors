import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api";
import Image from "next/image";
import { HeroSection } from "@/components/shop/hero-section";
import { TrendingCarousel } from "@/components/shop/trending-carousel";
import { PromoBanner } from "@/components/shop/promo-banner";
import { ProductCard } from "@/components/shared/product-card";

export default async function Home() {
  const featuredProducts = await getProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <PromoBanner />

      {/* Hero Section */}
      <HeroSection />

      <div className="flex-1 space-y-20 pb-20 pt-10">

        {/* Trending Section */}
        <section className="container px-4 md:px-6">
          <TrendingCarousel products={featuredProducts} />
        </section>

        {/* Categories Grid */}
        <section className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-10 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl">Explore our premium selection of spirits, wines, and beers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Spirits', 'Wine', 'Beer'].map((cat) => (
              <Link key={cat} href={`/shop?category=${cat.toLowerCase()}`} className="group relative h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-transform duration-500 group-hover:scale-105">
                  <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-md">{cat}</h3>
                  <span className="mt-2 text-sm font-medium text-white/80 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    Explore Collection
                  </span>
                </div>
                {/* Dynamic Gradients based on Category */}
                <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 
                  ${cat === 'Wine' ? 'from-rose-900/90 to-slate-900/90' :
                    cat === 'Beer' ? 'from-amber-700/90 to-slate-900/90' :
                      'from-slate-800 to-black'}
                `} />
                <Image
                  src={
                    cat === 'Wine' ? "https://images.unsplash.com/photo-1743184579851-5ec9972100b3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0" :
                      cat === 'Beer' ? "https://images.unsplash.com/photo-1699107026490-28826be799d8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0" :
                        "https://images.unsplash.com/photo-1718777878253-66ad58418843?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0"
                  }
                  alt={cat}
                  fill
                  className="object-cover -z-10 transition-transform duration-700 group-hover:scale-110 opacity-60"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Collection Grid */}
        <section className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">Curated For You</h2>
              <p className="text-muted-foreground">Hand-picked selections from our experts.</p>
            </div>
            <Link href="/shop" className="text-primary hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
            {featuredProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Deal/CTA Section */}
        <section className="relative h-[400px] w-full flex items-center justify-center overflow-hidden my-10">
          <div className="absolute inset-0 bg-chart-1/90" />
          <Image
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2669&auto=format&fit=crop"
            alt="Party"
            fill
            className="object-cover opacity-20"
          />
          <div className="relative z-10 text-center space-y-6 px-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black text-white">Join the State Liquors Club</h2>
            <p className="text-xl text-white/90">Get exclusive access to rare finds, member-only discounts, and free priority delivery.</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-white text-chart-1 hover:bg-gray-100 font-bold text-lg px-8">
                Sign Up Free
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
