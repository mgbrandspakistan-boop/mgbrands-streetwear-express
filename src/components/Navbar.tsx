import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import logo from "@/assets/logo.png";
import QuickViewModal from "@/components/QuickViewModal";
import type { Product } from "@/data/products";

// Custom category product imports
import customDesign1 from "@/assets/custom-tshirt-design-1.jpg";
import customDesign2 from "@/assets/custom-tshirt-design-2.jpg";
import customDesign3 from "@/assets/custom-tshirt-design-3.jpg";
import customDesign4 from "@/assets/custom-tshirt-design-4.jpg";
import customDesign5 from "@/assets/custom-tshirt-design-5.jpg";
import customDesign6 from "@/assets/custom-tshirt-design-6.jpg";
import mugClassicWhite from "@/assets/mug-classic-white.jpg";
import mugBlack from "@/assets/mug-black.jpg";
import mugMagic from "@/assets/mug-magic.jpg";
import mugInnerColor from "@/assets/mug-inner-color.jpg";
import mugTravel from "@/assets/mug-travel.jpg";
import stampSelfInk from "@/assets/stamp-self-ink.jpg";
import stampWooden from "@/assets/stamp-wooden.jpg";
import stampRound from "@/assets/stamp-round.jpg";
import stampPocket from "@/assets/stamp-pocket.jpg";
import stampSignature from "@/assets/stamp-signature.jpg";
import stampPen from "@/assets/stamp-pen.jpg";
import stampShinyPen from "@/assets/stamp-shiny-pen.jpg";
import walletLeather from "@/assets/wallet-leather.jpg";
import walletCardHolder from "@/assets/wallet-card-holder.jpg";
import walletZipper from "@/assets/wallet-zipper.jpg";
import walletMinimal from "@/assets/wallet-minimal.jpg";
import walletLong from "@/assets/wallet-long.jpg";

interface SearchItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  categoryLabel: string;
  navigateTo?: string; // if set, navigate instead of QuickView
  product?: Product;   // if set, open QuickView
}

const categoryLabelMap: Record<string, string> = {
  hoodies: "Hoodie",
  tshirts: "T-Shirt",
  sweatshirts: "Sweatshirt",
  jackets: "Jacket",
  "streetwear-sets": "Streetwear Set",
  shirts: "Shirt",
  watches: "Watch",
  shoes: "Shoe",
  "lockets-keychains": "Locket/Keychain",
  "new-arrivals": "New Arrival",
};

// Build unified search index
const customTShirtDesigns: SearchItem[] = [
  { id: "ct-1", productId: "MG-043", name: "Urban Graffiti Custom T-Shirt", price: 1899, image: customDesign1, categoryLabel: "Custom T-Shirt", navigateTo: "/custom-tshirt-designs" },
  { id: "ct-2", productId: "MG-044", name: "Midnight Abstract Custom T-Shirt", price: 1999, image: customDesign2, categoryLabel: "Custom T-Shirt", navigateTo: "/custom-tshirt-designs" },
  { id: "ct-3", productId: "MG-045", name: "Retro Wave Custom T-Shirt", price: 1799, image: customDesign3, categoryLabel: "Custom T-Shirt", navigateTo: "/custom-tshirt-designs" },
  { id: "ct-4", productId: "MG-046", name: "Nature Skull Custom T-Shirt", price: 2099, image: customDesign4, categoryLabel: "Custom T-Shirt", navigateTo: "/custom-tshirt-designs" },
  { id: "ct-5", productId: "MG-047", name: "Cyber Punk Custom T-Shirt", price: 1999, image: customDesign5, categoryLabel: "Custom T-Shirt", navigateTo: "/custom-tshirt-designs" },
  { id: "ct-6", productId: "MG-048", name: "Japanese Street Custom T-Shirt", price: 1899, image: customDesign6, categoryLabel: "Custom T-Shirt", navigateTo: "/custom-tshirt-designs" },
];

const mugItems: SearchItem[] = [
  { id: "mug-1", productId: "MG-049", name: "Classic White Mug", price: 799, image: mugClassicWhite, categoryLabel: "Custom Mug", navigateTo: "/custom-mug-print" },
  { id: "mug-2", productId: "MG-050", name: "Black Mug", price: 899, image: mugBlack, categoryLabel: "Custom Mug", navigateTo: "/custom-mug-print" },
  { id: "mug-3", productId: "MG-051", name: "Magic Mug (Heat Change)", price: 1299, image: mugMagic, categoryLabel: "Custom Mug", navigateTo: "/custom-mug-print" },
  { id: "mug-4", productId: "MG-052", name: "Inner Color Mug", price: 999, image: mugInnerColor, categoryLabel: "Custom Mug", navigateTo: "/custom-mug-print" },
  { id: "mug-5", productId: "MG-053", name: "Travel Mug", price: 1499, image: mugTravel, categoryLabel: "Custom Mug", navigateTo: "/custom-mug-print" },
];

const stampItems: SearchItem[] = [
  { id: "stamp-1", productId: "MG-054", name: "Self Ink Stamp", price: 799, image: stampSelfInk, categoryLabel: "Custom Stamp", navigateTo: "/custom-stamps" },
  { id: "stamp-2", productId: "MG-055", name: "Wooden Handle Stamp", price: 699, image: stampWooden, categoryLabel: "Custom Stamp", navigateTo: "/custom-stamps" },
  { id: "stamp-3", productId: "MG-056", name: "Round Stamp", price: 899, image: stampRound, categoryLabel: "Custom Stamp", navigateTo: "/custom-stamps" },
  { id: "stamp-4", productId: "MG-057", name: "Pocket Stamp", price: 999, image: stampPocket, categoryLabel: "Custom Stamp", navigateTo: "/custom-stamps" },
  { id: "stamp-5", productId: "MG-058", name: "Signature Stamp", price: 1099, image: stampSignature, categoryLabel: "Custom Stamp", navigateTo: "/custom-stamps" },
  { id: "stamp-6", productId: "MG-059", name: "Pen Stamp", price: 1199, image: stampPen, categoryLabel: "Custom Stamp", navigateTo: "/custom-stamps" },
  { id: "stamp-7", productId: "MG-060", name: "Shiny Pen Stamp", price: 1099, image: stampShinyPen, categoryLabel: "Custom Stamp", navigateTo: "/custom-stamps" },
];

const walletItems: SearchItem[] = [
  { id: "wallet-1", productId: "MG-061", name: "Leather Wallet", price: 2499, image: walletLeather, categoryLabel: "Custom Wallet", navigateTo: "/custom-wallet-design" },
  { id: "wallet-2", productId: "MG-062", name: "Card Holder Wallet", price: 1799, image: walletCardHolder, categoryLabel: "Custom Wallet", navigateTo: "/custom-wallet-design" },
  { id: "wallet-3", productId: "MG-063", name: "Zipper Wallet", price: 2799, image: walletZipper, categoryLabel: "Custom Wallet", navigateTo: "/custom-wallet-design" },
  { id: "wallet-4", productId: "MG-064", name: "Minimal Wallet", price: 1999, image: walletMinimal, categoryLabel: "Custom Wallet", navigateTo: "/custom-wallet-design" },
  { id: "wallet-5", productId: "MG-065", name: "Long Wallet", price: 3299, image: walletLong, categoryLabel: "Custom Wallet", navigateTo: "/custom-wallet-design" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shirts", href: "/shirts" },
  { label: "Custom T-Shirts", href: "/custom-tshirt-designs" },
  { label: "Custom Mug Print", href: "/custom-mug-print" },
  { label: "Custom Stamps", href: "/custom-stamps" },
  { label: "Custom Wallet", href: "/custom-wallet-design" },
  { label: "Watches", href: "/watches" },
  { label: "Shoes", href: "/shoes" },
  { label: "All Categories", href: "/all-categories" },
];

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[] | "not-found" | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Build full search index once
  const allSearchItems = useMemo<SearchItem[]>(() => {
    const mainProducts: SearchItem[] = products.map((p) => ({
      id: p.id,
      productId: p.productId,
      name: p.name,
      price: p.price,
      image: p.image,
      categoryLabel: categoryLabelMap[p.category] || p.category,
      product: p,
    }));
    return [...mainProducts, ...customTShirtDesigns, ...mugItems, ...stampItems, ...walletItems];
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { setSearchResults(null); return; }
    const results = allSearchItems.filter((item) => {
      const idNorm = item.productId.toLowerCase().replace(/-/g, "");
      const qNorm = q.replace(/-/g, "");
      const idMatch = item.productId.toLowerCase() === q || idNorm === qNorm;
      const nameMatch = item.name.toLowerCase().includes(q);
      const catMatch = item.categoryLabel.toLowerCase().includes(q);
      return idMatch || nameMatch || catMatch;
    });
    setSearchResults(results.length > 0 ? results : "not-found");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); setSearchResults(null); }
  };

  const handleResultClick = (item: SearchItem) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults(null);
    if (item.product) {
      setQuickViewProduct(item.product);
    } else if (item.navigateTo) {
      navigate(item.navigateTo);
    }
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
                    placeholder="Search by Product ID or Name (e.g. MG-001, Mug, Stamp, Hoodie)"
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
                        onClick={() => handleResultClick(result)}
                        className="flex items-center gap-3 p-2 bg-secondary/50 rounded-sm hover:bg-secondary transition-colors w-full text-left"
                      >
                        <img src={result.image} alt={result.name} className="w-12 h-12 object-cover rounded-sm bg-white" />
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground text-sm font-medium truncate">{result.name}</p>
                          <p className="text-muted-foreground text-xs">{result.productId} — PKR {result.price.toLocaleString()}</p>
                          <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {result.categoryLabel}
                          </span>
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
