import { Instagram, Facebook, Mail } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl text-foreground mb-4">
              MG <span className="text-gradient-neon">BRANDS</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Premium streetwear for the bold generation of Pakistan. Quality hoodies, tees, and casual wear delivered nationwide.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="mailto:info@mgbrandspakistan.shop" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Return Policy</a></li>
              <li><a href="mailto:info@mgbrandspakistan.shop" className="text-muted-foreground hover:text-primary transition-colors">info@mgbrandspakistan.shop</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2026 MG Brands Pakistan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
