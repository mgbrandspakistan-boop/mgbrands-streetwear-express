import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { products, Product, ProductCategory } from "@/data/products";
import { useCart } from "@/context/CartContext";
import QuickViewModal from "@/components/QuickViewModal";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

const categoryLabels: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hoodies", label: "Hoodies" },
  { id: "tshirts", label: "T-Shirts" },
  { id: "shirts", label: "Shirts" },
  { id: "sweatshirts", label: "Sweatshirts" },
  { id: "jackets", label: "Jackets" },
  { id: "streetwear-sets", label: "Streetwear Sets" },
];

const AllCategories = () => {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<ProductCategory | "all">("all");

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">All <span className="text-gradient-neon">Categories</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Browse our entire collection. Use filters to narrow down by category.</p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categoryLabels.map((c) => (
              <button key={c.id} onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-sm text-sm font-medium border transition-all ${filter === c.id ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                {c.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-6 text-center">{filtered.length} products</p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="group relative bg-card rounded-sm overflow-hidden card-hover">
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
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

export default AllCategories;
