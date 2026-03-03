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
  { label: "Custom Shirts", href: "/custom-shirts" },
  { label: "Custom T-Shirt Designs", href: "/custom-tshirt-designs" },
  { label: "Custom Mug Print", href: "/custom-mug-print" },
  { label: "Custom Stamps", href: "/custom-stamps" },
  { label: "All Categories", href: "/all-categories" },
];

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Product | null | "not-found">(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = () => {
    const q = searchQuery.trim().toUpperCase();
    if (!q) { setSearchResult(null); return; }
    const found = products.find((p) => p.productId.toUpperCase() === q || p.productId.toUpperCase().replace("-", "") === q.replace("-", ""));
    setSearchResult(found || "not-found");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); setSearchResult(null); }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="MG Brands Pakistan" className="h-10" />
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(""); setSearchResult(null); }} className="text-foreground hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
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
                    onChange={(e) => { setSearchQuery(e.target.value); setSearchResult(null); }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search by Product ID (e.g. MG-001)"
                    className="flex-1 bg-secondary border border-border rounded-sm px-4 py-2 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <button onClick={handleSearch} className="bg-primary text-primary-foreground px-4 py-2 rounded-sm text-sm font-semibold">
                    Search
                  </button>
                </div>
                {searchResult === "not-found" && (
                  <p className="text-destructive text-sm mt-2">Product Not Found</p>
                )}
                {searchResult && searchResult !== "not-found" && (
                  <button
                    onClick={() => { setQuickViewProduct(searchResult); setSearchOpen(false); setSearchQuery(""); setSearchResult(null); }}
                    className="flex items-center gap-3 mt-2 p-2 bg-secondary/50 rounded-sm hover:bg-secondary transition-colors w-full text-left"
                  >
                    <img src={searchResult.image} alt={searchResult.name} className="w-12 h-12 object-cover rounded-sm" />
                    <div>
                      <p className="text-foreground text-sm font-medium">{searchResult.name}</p>
                      <p className="text-muted-foreground text-xs">{searchResult.productId} — PKR {searchResult.price.toLocaleString()}</p>
                    </div>
                  </button>
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
              className="lg:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">
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
