import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <img src={logo} alt="MG Brands Pakistan" className="h-10" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Home", "Shop", "About", "Contact"].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {["Home", "Shop", "About", "Contact"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
