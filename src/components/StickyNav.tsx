import { Home, ShoppingBag, ShoppingCart, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

const StickyNav = () => {
  const { totalItems, setIsCartOpen } = useCart();

  const links = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: ShoppingBag, label: "Shop", href: "#shop" },
    { icon: ShoppingCart, label: "Cart", action: () => setIsCartOpen(true), badge: totalItems },
    { icon: Phone, label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border">
      <div className="flex justify-around items-center h-16">
        {links.map((link) => (
          link.action ? (
            <button key={link.label} onClick={link.action} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors relative">
              <link.icon size={20} />
              {link.badge ? (
                <span className="absolute -top-1 right-0 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {link.badge}
                </span>
              ) : null}
              <span className="text-[10px]">{link.label}</span>
            </button>
          ) : (
            <a key={link.label} href={link.href} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <link.icon size={20} />
              <span className="text-[10px]">{link.label}</span>
            </a>
          )
        ))}
      </div>
    </nav>
  );
};

export default StickyNav;
