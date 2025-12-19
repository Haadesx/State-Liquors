import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api";
import Image from "next/image";

export default async function Home() {
  const featuredProducts = await getProducts(); // Get all for now, slice later

  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src="https://images.unsplash.com/photo-1569937756447-e24dc533cc15?q=80&w=2669&auto=format&fit=crop"
            alt="Bar background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Premium Spirits <br /> Delivered.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Shop the finest selection of liquor, wine, and beer. Delivered straight to your door.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="text-lg px-8 py-6">
                Shop Now
              </Button>
            </Link>
            <Link href="/shop?category=wine">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-black">
                Shop Wine
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Collection</h2>
          <Link href="/shop" className="text-primary hover:underline font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="group">
              <div className="border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square bg-muted">
                  {/* Placeholder image logic if needed */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    {product.images[0] === '/placeholder.jpg' ? (
                      <span className="text-4xl text-gray-300">🍾</span>
                    ) : (
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground capitalize">{product.brand}</p>
                  <h3 className="font-semibold leading-none group-hover:underline truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <Button size="sm" variant="secondary">Add</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Spirits', 'Wine', 'Beer'].map((cat) => (
            <Link key={cat} href={`/shop?category=${cat.toLowerCase()}`} className="group relative h-64 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-3xl font-bold text-white">{cat}</h3>
              </div>
              {/* Can add background images here later */}
              <div className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 ${cat === 'Wine' ? 'from-rose-900 to-slate-900' :
                  cat === 'Beer' ? 'from-amber-700 to-slate-900' : ''
                }`} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
