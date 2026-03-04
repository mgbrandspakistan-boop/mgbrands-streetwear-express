import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import customDesign1 from "@/assets/custom-tshirt-design-1.jpg";
import customDesign2 from "@/assets/custom-tshirt-design-2.jpg";
import customDesign3 from "@/assets/custom-tshirt-design-3.jpg";
import customDesign4 from "@/assets/custom-tshirt-design-4.jpg";
import customDesign5 from "@/assets/custom-tshirt-design-5.jpg";
import customDesign6 from "@/assets/custom-tshirt-design-6.jpg";

const designs = [
  { id: 1, name: "Urban Graffiti", image: customDesign1, description: "Bold graffiti-style artwork for street culture enthusiasts.", price: 1899 },
  { id: 2, name: "Midnight Abstract", image: customDesign2, description: "Abstract geometric patterns with a dark urban edge.", price: 1999 },
  { id: 3, name: "Retro Wave", image: customDesign3, description: "Retro synthwave-inspired design with vibrant neon tones.", price: 1799 },
  { id: 4, name: "Street Typography", image: customDesign4, description: "Custom street-style typography with bold lettering.", price: 1899 },
  { id: 5, name: "Minimalist Logo", image: customDesign5, description: "Clean minimalist logo placement for subtle fashion.", price: 1699 },
  { id: 6, name: "Floral Dark", image: customDesign6, description: "Dark floral patterns blending nature with urban aesthetics.", price: 1999 },
];

const CustomTShirtDesigns = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom T-Shirt <span className="text-gradient-neon">Designs</span></h1>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Browse our gallery of ready-to-print designs. Pick your favorite and order via WhatsApp.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((d) => {
              const msg = encodeURIComponent(`Assalamualaikum MG Brands!\nI want to order the "${d.name}" T-Shirt design.\nPrice: PKR ${d.price.toLocaleString()}`);
              return (
                <div key={d.id} className="bg-card border border-border rounded-sm overflow-hidden card-hover shadow-sm">
                  <div className="aspect-[3/4] overflow-hidden bg-white">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-body font-semibold text-foreground mb-1">{d.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{d.description}</p>
                    <p className="text-primary font-bold text-lg mb-3">PKR {d.price.toLocaleString()}</p>
                    <a href={`https://wa.me/923271497570?text=${msg}`} target="_blank" rel="noopener noreferrer"
                      className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white py-2.5 rounded-sm font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                      <MessageCircle size={16} /> Order Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default CustomTShirtDesigns;
