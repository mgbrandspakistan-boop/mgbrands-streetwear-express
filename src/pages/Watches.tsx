import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import QuickViewModal from "@/components/QuickViewModal";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

type WatchFilter = "all" | "sports" | "digital" | "ultra" | "analog" | "luxury";

const filterLabels: { id: WatchFilter; label: string }[] = [
  { id: "all", label: "All Watches" },
  { id: "sports", label: "Sports" },
  { id: "digital", label: "Digital" },
  { id: "ultra", label: "Ultra" },
  { id: "analog", label: "Analog" },
  { id: "luxury", label: "Luxury" },
];

// Map product IDs to subcategories
const watchSubCategory: Record<string, WatchFilter> = {
  // Original watches MG-066 to MG-070
  "MG-066": "analog",   // Classic Analog Watch
  "MG-067": "digital",  // Digital Sports Watch
  "MG-068": "digital",  // Smart Fitness Watch
  "MG-069": "analog",   // Leather Strap Watch
  "MG-070": "analog",   // Metal Bracelet Watch
  // MG-086 to MG-095
  "MG-086": "luxury",   // Rose Gold Mesh Watch
  "MG-087": "sports",   // Tactical Military Watch
  "MG-088": "luxury",   // Luxury Gold Chronograph
  "MG-089": "analog",   // Ultra Minimal Watch
  "MG-090": "sports",   // Blue Diver Watch
  "MG-091": "luxury",   // Skeleton Vintage Watch
  "MG-092": "ultra",    // Ultra Digital Smartwatch
  "MG-093": "analog",   // Aviator Pilot Watch
  "MG-094": "luxury",   // Two-Tone Jubilee Watch
  "MG-095": "sports",   // Carbon Racing Chronograph
  // MG-121 to MG-135
  "MG-121": "ultra",    // Ultra Digital Watch 01
  "MG-122": "ultra",    // Ultra Digital Watch 02
  "MG-123": "digital",  // Smart Watch 01
  "MG-124": "digital",  // Smart Watch 02
  "MG-125": "sports",   // Sports Watch 01
  "MG-126": "sports",   // Sports Watch 02
  "MG-127": "luxury",   // Luxury Watch 01
  "MG-128": "luxury",   // Luxury Watch 02
  "MG-129": "analog",   // Chronograph Watch 01
  "MG-130": "analog",   // Chronograph Watch 02
  "MG-131": "analog",   // Analog Classic Watch 01
  "MG-132": "analog",   // Analog Classic Watch 02
  "MG-133": "analog",   // Minimal Watch 01
  "MG-134": "sports",   // Diver Watch 01
  "MG-135": "sports",   // Field Military Watch 01
  // MG-146 to MG-155
  "MG-146": "ultra",    // Ultra Digital Watch 03
  "MG-147": "digital",  // Smart Watch 03
  "MG-148": "luxury",   // Luxury Watch 03
  "MG-149": "analog",   // Chronograph Watch 03
  "MG-150": "analog",   // Analog Classic Watch 03
  "MG-151": "sports",   // Diver Watch 02
  "MG-152": "luxury",   // Skeleton Watch 02
  "MG-153": "analog",   // Aviator Watch 02
  "MG-154": "sports",   // Racing Watch 02
  "MG-155": "analog",   // Minimal Watch 02
};

const Watches = () => {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<WatchFilter>("all");

  const allProducts = products.filter((p) => p.category === "watches");

  const filtered = allProducts.filter((p) => {
    if (filter === "all") return true;
    return watchSubCategory[p.productId] === filter;
  });

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">Watches <span className="text-gradient-neon">Collection</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Premium watches for every style. From classic analog to modern smart watches, find your perfect timepiece at MG Brands Pakistan.</p>
          </motion.div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filterLabels.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${filter === f.id ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                {f.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-6 text-center">{filtered.length} products</p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="group relative bg-card rounded-sm overflow-hidden card-hover border border-border shadow-sm">
                <div className="relative aspect-[3/4] overflow-hidden border-b border-border" style={{ backgroundColor: product.bgColor || '#ffffff' }}>
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">{product.badge}</span>
                  )}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button onClick={() => setQuickViewProduct(product)}
                      className="bg-foreground/90 text-background px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Eye size={16} /> Quick View
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground font-mono">{product.productId}</p>
                  <h3 className="font-body font-semibold text-sm sm:text-base text-foreground mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-primary font-bold text-lg">PKR {product.price.toLocaleString()}</p>
                    <button onClick={() => addItem({ id: product.id, productId: product.productId, name: product.name, price: product.price, image: product.image })}
                      className="bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground p-2 rounded-sm transition-all duration-300">
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <QuickViewModal product={quickViewProduct} open={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default Watches;
