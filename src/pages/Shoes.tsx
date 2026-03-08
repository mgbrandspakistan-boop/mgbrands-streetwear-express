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

type ShoeFilter = "all" | "sports" | "office" | "casual" | "running" | "sneakers";

const filterLabels: { id: ShoeFilter; label: string }[] = [
  { id: "all", label: "All Shoes" },
  { id: "sports", label: "Sports" },
  { id: "office", label: "Office" },
  { id: "casual", label: "Casual" },
  { id: "running", label: "Running" },
  { id: "sneakers", label: "Sneakers" },
];

// Map product IDs to subcategories
const shoeSubCategory: Record<string, ShoeFilter> = {
  // Original MG-071 to MG-075
  "MG-071": "casual",     // Casual Leather Loafer
  "MG-072": "sports",     // Sports Training Shoe
  "MG-073": "sneakers",   // Classic Sneakers
  "MG-074": "office",     // Formal Oxford
  "MG-075": "running",    // Running Performance
  // MG-096 to MG-105
  "MG-096": "sneakers",   // Sneakers 01
  "MG-097": "sneakers",   // Sneakers 02
  "MG-098": "sneakers",   // Sneakers 03
  "MG-099": "sneakers",   // Sneakers 04
  "MG-100": "sneakers",   // Sneakers 05
  "MG-101": "sports",     // Sports Shoes 01
  "MG-102": "sports",     // Sports Shoes 02
  "MG-103": "sports",     // Sports Shoes 03
  "MG-104": "sports",     // Sports Shoes 04
  "MG-105": "sports",     // Sports Shoes 05
  // MG-106 to MG-110
  "MG-106": "running",    // Running Shoes 01
  "MG-107": "running",    // Running Shoes 02
  "MG-108": "running",    // Running Shoes 03
  "MG-109": "running",    // Running Shoes 04
  "MG-110": "running",    // Running Shoes 05
  // MG-111 to MG-115
  "MG-111": "casual",     // Casual Shoes 01
  "MG-112": "casual",     // Casual Shoes 02
  "MG-113": "casual",     // Casual Shoes 03
  "MG-114": "casual",     // Casual Shoes 04
  "MG-115": "casual",     // Casual Shoes 05
  // MG-116 to MG-120
  "MG-116": "office",     // Formal Shoes 01
  "MG-117": "office",     // Formal Shoes 02
  "MG-118": "office",     // Formal Shoes 03
  "MG-119": "office",     // Formal Shoes 04
  "MG-120": "office",     // Formal Shoes 05
  // MG-136 to MG-145
  "MG-136": "sneakers",   // High Top Canvas 01
  "MG-137": "casual",     // Slip On Casual 01
  "MG-138": "sneakers",   // Platform Chunky 01
  "MG-139": "sneakers",   // Retro Heritage Runner
  "MG-140": "sports",     // Trail Adventure 01
  "MG-141": "office",     // Derby Brogue Classic
  "MG-142": "sneakers",   // Clean Low Top 01
  "MG-143": "sports",     // Basketball High 01
  "MG-144": "sneakers",   // Sock Runner Elite
  "MG-145": "casual",     // Chelsea Boot Classic
};

const Shoes = () => {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<ShoeFilter>("all");

  const allProducts = products.filter((p) => p.category === "shoes");

  const filtered = allProducts.filter((p) => {
    if (filter === "all") return true;
    return shoeSubCategory[p.productId] === filter;
  });

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">Shoes <span className="text-gradient-neon">Collection</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Step up your style with premium footwear. From casual loafers to sports shoes, find the perfect pair at MG Brands Pakistan.</p>
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

export default Shoes;
