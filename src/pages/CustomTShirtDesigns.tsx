import { useState } from "react";
import { MessageCircle, Upload } from "lucide-react";
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

const sizes = ["S", "M", "L", "XL"];
const colors = [
  { name: "White", hex: "#f5f5f5" },
  { name: "Black", hex: "#222" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Sky Blue", hex: "#5b9bd5" },
  { name: "Beige", hex: "#d4c5a9" },
  { name: "Grey", hex: "#999" },
  { name: "Pink", hex: "#d4a0a0" },
];

const CustomTShirtDesigns = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"gallery" | "custom">("gallery");

  const startingPrice = 2499;
  const whatsAppMsg = encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want to order a Custom T-Shirt:\n• Size: ${selectedSize || "Not selected"}\n• Color: ${selectedColor || "Not selected"}\n• Qty: ${quantity}\n• Design: ${fileName || "Will share on chat"}\n• Starting Price: PKR ${startingPrice.toLocaleString()}`
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom <span className="text-gradient-neon">T-Shirts</span></h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">Browse ready-to-print designs or upload your own custom design.</p>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10">
            <button onClick={() => setActiveTab("gallery")}
              className={`px-6 py-2.5 rounded-sm text-sm font-semibold border transition-all ${activeTab === "gallery" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
              Design Gallery
            </button>
            <button onClick={() => setActiveTab("custom")}
              className={`px-6 py-2.5 rounded-sm text-sm font-semibold border transition-all ${activeTab === "custom" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
              Upload Your Design
            </button>
          </div>

          {activeTab === "gallery" && (
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
          )}

          {activeTab === "custom" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-sm p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Upload Your Design</p>
                  <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-sm py-8 cursor-pointer hover:border-primary transition-colors">
                    <Upload size={24} className="text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">{fileName || "Click to upload image"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} />
                  </label>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button key={s} onClick={() => setSelectedSize(s)}
                        className={`min-w-[44px] h-10 px-3 rounded-sm text-sm font-semibold border transition-all ${selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Select Color: <span className="text-foreground">{selectedColor || "—"}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button key={c.name} onClick={() => setSelectedColor(c.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-primary scale-110 ring-2 ring-primary/40" : "border-border hover:border-muted-foreground"}`}
                        style={{ backgroundColor: c.hex }} title={c.name} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">Quantity</p>
                  <div className="flex items-center border border-border rounded-sm w-fit">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary">−</button>
                    <span className="w-12 text-center text-foreground font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary">+</button>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-sm p-4">
                  <p className="text-muted-foreground text-sm">Starting from</p>
                  <p className="text-primary font-bold text-2xl">PKR {startingPrice.toLocaleString()}</p>
                </div>
                <a href={`https://wa.me/923271497570?text=${whatsAppMsg}`} target="_blank" rel="noopener noreferrer"
                  className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white py-3 rounded-sm font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                  <MessageCircle size={18} /> Order via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default CustomTShirtDesigns;
