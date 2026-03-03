import { Instagram, Facebook, Mail, Phone, CreditCard } from "lucide-react";
import logo from "@/assets/logo.png";

const SiteFooter = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <img src={logo} alt="MG Brands Pakistan" className="h-12 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              MG Brands Pakistan is a premium streetwear brand offering high-quality custom and ready-made apparel. We deliver bold, modern fashion with unmatched quality nationwide.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="mailto:mgbrandspakistan@gmail.com" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail size={14} /> mgbrandspakistan@gmail.com</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +92 329 1497570</li>
            </ul>

            <h4 className="font-display text-lg text-foreground mb-3 mt-6">Payment Methods</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><CreditCard size={14} /> Bank Transfer</li>
              <li className="flex items-center gap-2"><CreditCard size={14} /> JazzCash</li>
              <li className="flex items-center gap-2"><CreditCard size={14} /> EasyPaisa</li>
              <li className="flex items-center gap-2"><CreditCard size={14} /> Payoneer</li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Return Policy</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Orders can be returned within 3 days of delivery. Items must be unused and in original condition. Custom products are not returnable unless defective.
            </p>

            <h4 className="font-display text-lg text-foreground mb-3">Privacy Policy</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your personal data is secure with us. We do not share customer information with third parties.
            </p>
          </div>

          {/* Delivery */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Delivery Information</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Processing time: 1–2 working days</li>
              <li>• Delivery time: 3–5 working days</li>
              <li>• Nationwide delivery available</li>
              <li>• Delivery charges may apply</li>
            </ul>

            <h4 className="font-display text-lg text-foreground mb-3 mt-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Facebook</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">TikTok</a>
            </div>
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
