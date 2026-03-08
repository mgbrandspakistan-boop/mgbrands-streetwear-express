import { useState, useRef } from "react";
import { MessageCircle, Upload, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCustomizer from "@/components/ProductCustomizer";
import mugClassicWhite from "@/assets/mug-classic-white.jpg";
import mugBlack from "@/assets/mug-black.jpg";
import mugMagic from "@/assets/mug-magic.jpg";
import mugInnerColor from "@/assets/mug-inner-color.jpg";
import mugTravel from "@/assets/mug-travel.jpg";

const mugTypes = [
  { id: "classic-white", productId: "MG-049", name: "Classic White Mug", image: mugClassicWhite, price: 799 },
  { id: "black", productId: "MG-050", name: "Black Mug", image: mugBlack, price: 899 },
  { id: "magic", productId: "MG-051", name: "Magic Mug (Heat Change)", image: mugMagic, price: 1299 },
  { id: "inner-color", productId: "MG-052", name: "Inner Color Mug", image: mugInnerColor, price: 999 },
  { id: "travel", productId: "MG-053", name: "Travel Mug", image: mugTravel, price: 1499 },
];

const mugColors = [
  { name: "White", hex: "#f5f5f5" },
  { name: "Black", hex: "#222" },
  { name: "Red", hex: "#dc2626" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Green", hex: "#16a34a" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Yellow", hex: "#eab308" },
];

const CustomMugPrint = () => {
  const [selectedMug, setSelectedMug] = useState(mugTypes[0]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
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
    `Assalamualaikum MG Brands!\nI want a Custom Mug:\n• Product ID: ${selectedMug.productId}\n• Mug Type: ${selectedMug.name}\n• Color: ${selectedColor || "Default"}\n• Name on Mug: ${name || "Not specified"}\n• Message: ${message || "None"}\n• Design: ${fileName || "Will share on chat"}\n• Price: PKR ${selectedMug.price.toLocaleString()}`
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom Mug <span className="text-gradient-neon">Print</span></h1>
          <p className="text-muted-foreground text-center mb-10">Select your mug type, color, upload a design, and place your order.</p>

          {/* Step 1: Select Mug Type */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Select Mug Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {mugTypes.map((mug) => (
                <button key={mug.id} onClick={() => setSelectedMug(mug)}
                  className={`relative bg-card border rounded-sm overflow-hidden transition-all ${selectedMug.id === mug.id ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-muted-foreground"}`}>
                  <div className="aspect-square overflow-hidden bg-white">
                    <img src={mug.image} alt={mug.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  {selectedMug.id === mug.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-[10px] text-muted-foreground font-mono text-center">{mug.productId}</p>
                    <p className="text-xs font-medium text-foreground text-center leading-tight">{mug.name}</p>
                    <p className="text-xs text-primary font-bold text-center mt-1">PKR {mug.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Design Editor */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">★</span>
              Design Editor — Drag, Zoom & Rotate Preview
            </h2>
            <ProductCustomizer
              productType="mug"
              baseImage={selectedMug.image}
              productName={selectedMug.name}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Preview */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Quick Preview
              </h2>
              <div className="bg-white border border-border rounded-sm overflow-hidden aspect-square flex items-center justify-center relative">
                <img src={selectedMug.image} alt={selectedMug.name} className="w-3/4 h-3/4 object-contain" />
                {designPreview && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <img src={designPreview} alt="Your design" className="w-1/3 h-1/3 object-contain opacity-80 rounded-sm" />
                  </div>
                )}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-2">{selectedMug.name}</p>
            </div>

            {/* Right: Options */}
            <div className="space-y-6">
              {/* Step 2: Color */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Select Color: <span className="text-muted-foreground text-sm font-normal">{selectedColor || "Default"}</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {mugColors.map((c) => (
                    <button key={c.name} onClick={() => setSelectedColor(c.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-primary scale-110 ring-2 ring-primary/40" : "border-border hover:border-muted-foreground"}`}
                      style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
              </div>

              {/* Step 3: Upload Design */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Upload Your Design
                </h2>
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

              {/* Step 4: Details */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Enter Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1 font-medium">Name on Mug</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name"
                      className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1 font-medium">Custom Message</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message" rows={3}
                      className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
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
                      <p className="text-muted-foreground text-sm">Selected: {selectedMug.name}</p>
                      <p className="text-muted-foreground text-xs">ID: {selectedMug.productId} · Color: {selectedColor || "Default"}</p>
                    </div>
                    <p className="text-primary font-bold text-2xl">PKR {selectedMug.price.toLocaleString()}</p>
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

export default CustomMugPrint;
