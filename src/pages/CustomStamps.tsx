import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

const stampTypes = ["Round Stamp", "Rectangle Stamp", "Square Stamp", "Oval Stamp"];

const CustomStamps = () => {
  const [customText, setCustomText] = useState("");
  const [stampType, setStampType] = useState<string | null>(null);

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

          <div className="bg-card border border-border rounded-sm p-6 space-y-5">
            <div>
              <label className="block text-sm text-muted-foreground mb-1 font-medium">Custom Text</label>
              <input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Enter text for your stamp"
                className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Stamp Type</p>
              <div className="grid grid-cols-2 gap-2">
                {stampTypes.map((t) => (
                  <button key={t} onClick={() => setStampType(t)}
                    className={`p-3 rounded-sm border text-sm font-medium transition-all ${stampType === t ? "border-primary bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            {customText && stampType && (
              <div className="bg-secondary/50 rounded-sm p-6 flex items-center justify-center">
                <div className={`border-2 border-primary p-4 text-center ${stampType === "Round Stamp" || stampType === "Oval Stamp" ? "rounded-full px-8" : stampType === "Square Stamp" ? "aspect-square flex items-center justify-center w-32" : "rounded-sm px-6"}`}>
                  <p className="text-foreground font-display text-lg">{customText}</p>
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
