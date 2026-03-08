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

type SubFilter = "all" | "lockets" | "photo-lockets" | "name-lockets" | "keychains" | "photo-keychains" | "custom-keychains";

const filterLabels: { id: SubFilter; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "lockets", label: "Lockets" },
  { id: "photo-lockets", label: "Photo Lockets" },
  { id: "name-lockets", label: "Name Lockets" },
  { id: "keychains", label: "Keychains" },
  { id: "photo-keychains", label: "Photo Keychains" },
  { id: "custom-keychains", label: "Custom Keychains" },
];

// Map product IDs to subcategories
const locketSubCategory: Record<string, SubFilter> = {
  "MG-156": "photo-lockets",    // Gold Heart Photo Locket
  "MG-157": "lockets",          // Silver Round Engraved Locket
  "MG-158": "photo-lockets",    // Rose Gold Oval Locket
  "MG-159": "lockets",          // Couple Heart Locket Set
  "MG-160": "name-lockets",     // Silver Name Necklace Locket
  "MG-161": "lockets",          // Vintage Gold Filigree Locket
  "MG-162": "photo-lockets",    // Silver Square Photo Locket
  "MG-163": "lockets",          // Gold Butterfly Locket
  "MG-164": "lockets",          // Rose Gold Infinity Couple Locket
  "MG-165": "lockets",          // Silver Star Locket
  "MG-166": "lockets",          // Gold Tree of Life Locket
  "MG-167": "lockets",          // Gold Crown Royal Locket
  "MG-168": "lockets",          // Silver Moon & Stars Locket
  "MG-169": "lockets",          // Rose Gold Circle Charm Locket
  "MG-170": "photo-lockets",    // Gold Teardrop Locket
  "MG-171": "photo-keychains",  // Rectangular Photo Keychain
  "MG-172": "photo-keychains",  // Heart Photo Keychain
  "MG-173": "custom-keychains", // Leather Name Keychain
  "MG-174": "custom-keychains", // Acrylic Custom Keychain
  "MG-175": "custom-keychains", // Initial Letter Keychain
  "MG-176": "keychains",        // Couple Puzzle Keychain Set
  "MG-177": "custom-keychains", // Wooden Engraved Keychain
  "MG-178": "photo-keychains",  // Crystal 3D Photo Keychain
  "MG-179": "keychains",        // Resin Flower Keychain
  "MG-180": "keychains",        // Steel Dog Tag Keychain
  "MG-181": "keychains",        // Carabiner Compass Keychain
  "MG-182": "keychains",        // Globe Spinner Keychain
  "MG-183": "keychains",        // Bottle Opener Keychain
  "MG-184": "keychains",        // Sports Car Keychain
  "MG-185": "photo-lockets",    // Photo Locket Heart Mini
  "MG-186": "photo-lockets",    // Double Photo Locket Round
  "MG-187": "custom-keychains", // Couple Name Keychain Set
  "MG-188": "photo-lockets",    // Photo Oval Rosegold Locket
  "MG-189": "custom-keychains", // Custom Acrylic Photo Keychain
  "MG-190": "lockets",          // Gold Vintage Pocket Locket
  "MG-191": "photo-keychains",  // Crystal Heart Keychain
  "MG-192": "custom-keychains", // Resin Art Custom Keychain
  "MG-193": "keychains",        // Silver Engraved Dog Tag
  "MG-194": "name-lockets",     // Infinity Name Locket
  "MG-195": "keychains",        // Adventure Carabiner Set
};

const isLocketType = (sub: SubFilter) => sub === "lockets" || sub === "photo-lockets" || sub === "name-lockets";
const isKeychainType = (sub: SubFilter) => sub === "keychains" || sub === "photo-keychains" || sub === "custom-keychains";

const LocketsKeychains = () => {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<SubFilter>("all");

  const allProducts = products.filter((p) => p.category === "lockets-keychains");

  const filtered = allProducts.filter((p) => {
    if (filter === "all") return true;
    const sub = locketSubCategory[p.productId];
    if (!sub) return false;
    // "lockets" shows all locket types, "keychains" shows all keychain types
    if (filter === "lockets") return isLocketType(sub);
    if (filter === "keychains") return isKeychainType(sub);
    return sub === filter;
  });

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">Lockets & <span className="text-gradient-neon">Keychains</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Beautiful photo lockets, name lockets, couple lockets, and custom keychains. Perfect personalized gifts.</p>
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

export default LocketsKeychains;
