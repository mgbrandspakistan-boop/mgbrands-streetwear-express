import { useState, useRef } from "react";
import { MessageCircle, Upload, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCustomizer from "@/components/ProductCustomizer";
import stampSelfInk from "@/assets/stamp-self-ink.jpg";
import stampWooden from "@/assets/stamp-wooden.jpg";
import stampPocket from "@/assets/stamp-pocket.jpg";
import stampRound from "@/assets/stamp-round.jpg";
import stampSignature from "@/assets/stamp-signature.jpg";
import stampPen from "@/assets/stamp-pen.jpg";
import stampShinyPen from "@/assets/stamp-shiny-pen.jpg";

const stampTypes = [
  { id: "self-ink", productId: "MG-054", name: "Self Ink Stamp", image: stampSelfInk, price: 799 },
  { id: "wooden", productId: "MG-055", name: "Wooden Handle Stamp", image: stampWooden, price: 699 },
  { id: "pocket", productId: "MG-057", name: "Pocket Stamp", image: stampPocket, price: 899 },
  { id: "round", productId: "MG-056", name: "Round Stamp", image: stampRound, price: 749 },
  { id: "signature", productId: "MG-058", name: "Signature Stamp", image: stampSignature, price: 999 },
  { id: "pen-stamp", productId: "MG-059", name: "Pen Stamp", image: stampPen, price: 1199 },
  { id: "shiny-pen-stamp", productId: "MG-060", name: "Shiny Pen Stamp", image: stampShinyPen, price: 1099 },
];

const stampSizes = [
  { label: "Small", desc: "20×40mm" },
  { label: "Medium", desc: "30×60mm" },
  { label: "Large", desc: "40×80mm" },
];

const inkColors = [
  { name: "Black", hex: "#222" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Red", hex: "#dc2626" },
  { name: "Green", hex: "#16a34a" },
  { name: "Purple", hex: "#7c3aed" },
  { name: "Brown", hex: "#92400e" },
];

const CustomStamps = () => {
  const [selectedStamp, setSelectedStamp] = useState(stampTypes[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => setDesignPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const whatsAppMsg = encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want a Custom Stamp:\n• Product ID: ${selectedStamp.productId}\n• Type: ${selectedStamp.name}\n• Size: ${selectedSize || "Not selected"}\n• Ink Color: ${selectedColor || "Default"}\n• Custom Text: ${customText || "Not specified"}\n• Design: ${fileName || "Will share on chat"}\n• Price: PKR ${selectedStamp.price.toLocaleString()}`
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom <span className="text-gradient-neon">Stamps</span></h1>
          <p className="text-muted-foreground text-center mb-10">Select your stamp type, size, ink color, upload a design, and place your order.</p>

          {/* Step 1: Select Stamp Type */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Select Stamp Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {stampTypes.map((stamp) => (
                <button key={stamp.id} onClick={() => setSelectedStamp(stamp)}
                  className={`relative bg-card border rounded-sm overflow-hidden transition-all ${selectedStamp.id === stamp.id ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-muted-foreground"}`}>
                  <div className="aspect-square overflow-hidden bg-white">
                    <img src={stamp.image} alt={stamp.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  {selectedStamp.id === stamp.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-[10px] text-muted-foreground font-mono text-center">{stamp.productId}</p>
                    <p className="text-xs font-medium text-foreground text-center leading-tight">{stamp.name}</p>
                    <p className="text-xs text-primary font-bold text-center mt-1">PKR {stamp.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Preview */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">★</span>
                Preview
              </h2>
              <div className="bg-white border border-border rounded-sm overflow-hidden aspect-square flex items-center justify-center relative">
                <img src={selectedStamp.image} alt={selectedStamp.name} className="w-3/4 h-3/4 object-contain" />
                {designPreview && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img src={designPreview} alt="Your design" className="w-1/3 h-1/3 object-contain opacity-80 rounded-sm" />
                  </div>
                )}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-2">{selectedStamp.name}</p>
            </div>

            {/* Right: Options */}
            <div className="space-y-6">
              {/* Step 2: Size */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Select Size
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stampSizes.map((s) => (
                    <button key={s.label} onClick={() => setSelectedSize(s.label)}
                      className={`px-4 py-2.5 rounded-sm text-sm font-semibold border transition-all ${selectedSize === s.label ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                      {s.label} <span className="text-xs opacity-70">({s.desc})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Ink Color */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Select Ink Color: <span className="text-muted-foreground text-sm font-normal">{selectedColor || "Default"}</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {inkColors.map((c) => (
                    <button key={c.name} onClick={() => setSelectedColor(c.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-primary scale-110 ring-2 ring-primary/40" : "border-border hover:border-muted-foreground"}`}
                      style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
              </div>

              {/* Step 4: Custom Text / Upload */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Custom Text / Upload Design
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1 font-medium">Custom Text</label>
                    <input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Enter text for your stamp"
                      className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1 font-medium">Upload Logo / Design</label>
                    <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-sm py-6 cursor-pointer hover:border-primary transition-colors bg-card">
                      <Upload size={24} className="text-muted-foreground" />
                      <span className="text-muted-foreground text-sm">{fileName || "Click to upload (JPG, PNG)"}</span>
                      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileUpload} />
                    </label>
                    {designPreview && (
                      <div className="mt-3 flex items-center gap-3">
                        <img src={designPreview} alt="Preview" className="w-16 h-16 object-cover rounded-sm border border-border" />
                        <div>
                          <p className="text-sm text-foreground font-medium">{fileName}</p>
                          <button onClick={() => { setDesignPreview(null); setFileName(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                            className="text-xs text-destructive hover:underline">Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 5: Order */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Place Order
                </h2>
                <div className="bg-secondary/50 rounded-sm p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">Selected: {selectedStamp.name}</p>
                      <p className="text-muted-foreground text-xs">ID: {selectedStamp.productId} · Size: {selectedSize || "—"} · Ink: {selectedColor || "Default"}</p>
                    </div>
                    <p className="text-primary font-bold text-2xl">PKR {selectedStamp.price.toLocaleString()}</p>
                  </div>
                </div>
                <a href={`https://wa.me/923271497570?text=${whatsAppMsg}`} target="_blank" rel="noopener noreferrer"
                  className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white py-3 rounded-sm font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                  <MessageCircle size={18} /> Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default CustomStamps;
