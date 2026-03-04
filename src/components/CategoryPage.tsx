import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { products, Product, ProductCategory } from "@/data/products";
import { useCart } from "@/context/CartContext";
import QuickViewModal from "@/components/QuickViewModal";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

interface CategoryPageProps {
  category: ProductCategory;
  title: string;
  description: string;
}

const CategoryPage = ({ category, title, description }: CategoryPageProps) => {
  const { addItem } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">{title}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
            <p className="text-sm text-muted-foreground mt-2">{categoryProducts.length} products</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoryProducts.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group relative bg-card rounded-sm overflow-hidden card-hover border border-border shadow-sm">
                <div className="relative aspect-[3/4] overflow-hidden border-b border-border bg-white">
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
    </>
  );
};

export default CategoryPage;
