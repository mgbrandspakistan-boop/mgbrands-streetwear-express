import { useState } from "react";
import { MessageCircle, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

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

const CustomShirts = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);

  const startingPrice = 2499;

  const whatsAppMsg = encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want to order a Custom Shirt:\n• Size: ${selectedSize || "Not selected"}\n• Color: ${selectedColor || "Not selected"}\n• Qty: ${quantity}\n• Design: ${fileName || "Will share on chat"}\n• Starting Price: PKR ${startingPrice.toLocaleString()}`
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom <span className="text-gradient-neon">Shirts</span></h1>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">Upload your own design and we'll print it on a premium shirt. Choose your size, color, and quantity below.</p>

          <div className="bg-card border border-border rounded-sm p-6 space-y-6">
            {/* Upload */}
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Upload Your Design</p>
              <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-sm py-8 cursor-pointer hover:border-primary transition-colors">
                <Upload size={24} className="text-muted-foreground" />
                <span className="text-muted-foreground text-sm">{fileName || "Click to upload image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} />
              </label>
            </div>

            {/* Size */}
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

            {/* Color */}
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

            {/* Quantity */}
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Quantity</p>
              <div className="flex items-center border border-border rounded-sm w-fit">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary">−</button>
                <span className="w-12 text-center text-foreground font-semibold">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary">+</button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-secondary/50 rounded-sm p-4">
              <p className="text-muted-foreground text-sm">Starting from</p>
              <p className="text-primary font-bold text-2xl">PKR {startingPrice.toLocaleString()}</p>
            </div>

            {/* Order */}
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

export default CustomShirts;
