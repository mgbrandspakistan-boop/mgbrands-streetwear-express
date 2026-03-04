import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import customStamp1 from "@/assets/custom-stamp-1.jpg";
import customStamp2 from "@/assets/custom-stamp-2.jpg";
import customStamp3 from "@/assets/custom-stamp-3.jpg";
import customStamp4 from "@/assets/custom-stamp-4.jpg";
import customStamp5 from "@/assets/custom-stamp-5.jpg";

const stampTypes = [
  { name: "Round Stamp", image: customStamp1 },
  { name: "Rectangle Stamp", image: customStamp2 },
  { name: "Oval Stamp", image: customStamp3 },
  { name: "Square Stamp", image: customStamp4 },
  { name: "Pencil Stamp", image: customStamp5 },
];

const CustomStamps = () => {
  const [customText, setCustomText] = useState("");
  const [stampType, setStampType] = useState<string | null>(null);

  const selectedStamp = stampTypes.find((s) => s.name === stampType);

  const price = 799;
  const whatsAppMsg = encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want a Custom Stamp:\n• Text: ${customText || "Not specified"}\n• Type: ${stampType || "Not selected"}\n• Price: PKR ${price.toLocaleString()}`
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom <span className="text-gradient-neon">Stamps</span></h1>
          <p className="text-muted-foreground text-center mb-10">Create your personalized stamp with custom text and your preferred stamp shape.</p>

          {/* Stamp Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {stampTypes.map((stamp) => (
              <button key={stamp.name} onClick={() => setStampType(stamp.name)}
                className={`bg-white border rounded-sm overflow-hidden shadow-sm transition-all ${stampType === stamp.name ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-muted-foreground"}`}>
                <div className="aspect-square overflow-hidden bg-white">
                  <img src={stamp.image} alt={stamp.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-xs text-muted-foreground text-center py-2 font-medium">{stamp.name}</p>
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-sm p-6 space-y-5">
            <div>
              <label className="block text-sm text-muted-foreground mb-1 font-medium">Custom Text</label>
              <input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Enter text for your stamp"
                className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Selected: <span className="text-foreground">{stampType || "Pick from gallery above"}</span></p>
            </div>

            {/* Preview */}
            {customText && selectedStamp && (
              <div className="bg-white rounded-sm p-6 flex items-center justify-center border border-border">
                <div className="relative w-40 h-40">
                  <img src={selectedStamp.image} alt={stampType || ""} className="w-full h-full object-contain" />
                </div>
              </div>
            )}

            <div className="bg-secondary/50 rounded-sm p-4">
              <p className="text-muted-foreground text-sm">Price</p>
              <p className="text-primary font-bold text-2xl">PKR {price.toLocaleString()}</p>
            </div>

            <a href={`https://wa.me/923271497570?text=${whatsAppMsg}`} target="_blank" rel="noopener noreferrer"
              className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white py-3 rounded-sm font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
              <MessageCircle size={18} /> Order via WhatsApp
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default CustomStamps;
