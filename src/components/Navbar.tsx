import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import logo from "@/assets/logo.png";
import QuickViewModal from "@/components/QuickViewModal";
import type { Product } from "@/data/products";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shirts", href: "/shirts" },
  { label: "Custom T-Shirts", href: "/custom-tshirt-designs" },
  { label: "Custom Mug Print", href: "/custom-mug-print" },
  { label: "Custom Stamps", href: "/custom-stamps" },
  { label: "All Categories", href: "/all-categories" },
];

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[] | "not-found" | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { setSearchResults(null); return; }
    // Search by product ID (exact) or name (partial, case-insensitive)
    const results = products.filter((p) => {
      const idMatch = p.productId.toLowerCase() === q || p.productId.toLowerCase().replace("-", "") === q.replace("-", "");
      const nameMatch = p.name.toLowerCase().includes(q);
      return idMatch || nameMatch;
    });
    setSearchResults(results.length > 0 ? results : "not-found");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); setSearchResults(null); }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(0,0%,12%)]/95 backdrop-blur-xl border-b border-[hsl(0,0%,20%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="MG Brands Pakistan" className="h-10" />
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="text-xs font-medium text-gray-300 hover:text-primary transition-colors duration-300 whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); setSearchResults(null); }} className="text-gray-200 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-200 hover:text-primary transition-colors">
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="lg:hidden text-gray-200" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-border overflow-hidden bg-card"
            >
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex gap-2">
                  <input
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setSearchResults(null); }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search by Product ID or Name (e.g. MG-001 or Black Hoodie)"
                    className="flex-1 bg-secondary border border-border rounded-sm px-4 py-2 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <button onClick={handleSearch} className="bg-primary text-primary-foreground px-4 py-2 rounded-sm text-sm font-semibold">
                    Search
                  </button>
                </div>
                {searchResults === "not-found" && (
                  <p className="text-destructive text-sm mt-2">No products found</p>
                )}
                {searchResults && searchResults !== "not-found" && (
                  <div className="mt-2 space-y-1 max-h-64 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button key={result.id}
                        onClick={() => { setQuickViewProduct(result); setSearchOpen(false); setSearchQuery(""); setSearchResults(null); }}
                        className="flex items-center gap-3 p-2 bg-secondary/50 rounded-sm hover:bg-secondary transition-colors w-full text-left"
                      >
                        <img src={result.image} alt={result.name} className="w-12 h-12 object-cover rounded-sm bg-white" />
                        <div>
                          <p className="text-foreground text-sm font-medium">{result.name}</p>
                          <p className="text-muted-foreground text-xs">{result.productId} — PKR {result.price.toLocaleString()}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-[hsl(0,0%,12%)] border-b border-[hsl(0,0%,20%)] overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="text-base font-medium text-gray-300 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <QuickViewModal product={quickViewProduct} open={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
};

export default Navbar;
