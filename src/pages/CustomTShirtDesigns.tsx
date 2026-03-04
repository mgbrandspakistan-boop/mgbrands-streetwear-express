import { useState, useRef } from "react";
import { MessageCircle, Upload, ShoppingBag, Edit3, ArrowLeft, X } from "lucide-react";
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

interface Design {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

const designs: Design[] = [
  { id: 1, name: "Urban Graffiti", image: customDesign1, description: "Bold graffiti-style artwork for street culture enthusiasts.", price: 1899 },
  { id: 2, name: "Midnight Abstract", image: customDesign2, description: "Abstract geometric patterns with a dark urban edge.", price: 1999 },
  { id: 3, name: "Retro Wave", image: customDesign3, description: "Retro synthwave-inspired design with vibrant neon tones.", price: 1799 },
  { id: 4, name: "Street Typography", image: customDesign4, description: "Custom street-style typography with bold lettering.", price: 1899 },
  { id: 5, name: "Minimalist Logo", image: customDesign5, description: "Clean minimalist logo placement for subtle fashion.", price: 1699 },
  { id: 6, name: "Floral Dark", image: customDesign6, description: "Dark floral patterns blending nature with urban aesthetics.", price: 1999 },
];

const sizes = ["S", "M", "L", "XL", "2XL"];

const shirtColors = [
  { name: "White", hex: "#f5f5f5" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Navy", hex: "#1e3a5f" },
  { name: "Red", hex: "#b91c1c" },
  { name: "Grey", hex: "#6b7280" },
  { name: "Sky Blue", hex: "#7dd3fc" },
  { name: "Olive", hex: "#4d7c0f" },
  { name: "Maroon", hex: "#7f1d1d" },
  { name: "Beige", hex: "#d4c5a9" },
];

type ViewMode = "gallery" | "custom" | "order-same" | "customize";

const CustomTShirtDesigns = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(shirtColors[0]);
  const [quantity, setQuantity] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"gallery" | "custom">("gallery");
  const [side, setSide] = useState<"front" | "back">("front");
  const [customText, setCustomText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gallery click flow
  const [clickedDesign, setClickedDesign] = useState<Design | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");

  const handleDesignClick = (design: Design) => {
    setClickedDesign(design);
  };

  const handleOrderSame = (design: Design) => {
    setClickedDesign(design);
    setViewMode("order-same");
    setSelectedSize(null);
    setSelectedColor(shirtColors[0]);
    setQuantity(1);
    setSide("front");
  };

  const handleCustomize = (design: Design) => {
    setClickedDesign(design);
    setViewMode("customize");
    setSelectedSize(null);
    setSelectedColor(shirtColors[0]);
    setQuantity(1);
    setSide("front");
    setCustomText("");
  };

  const handleBackToGallery = () => {
    setClickedDesign(null);
    setViewMode("gallery");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => setDesignPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startingPrice = 2499;
  const customTabMsg = encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want to order a Custom T-Shirt:\n• Size: ${selectedSize || "Not selected"}\n• Color: ${selectedColor.name}\n• Side: ${side}\n• Qty: ${quantity}\n• Design: ${fileName || "Will share on chat"}\n• Starting Price: PKR ${startingPrice.toLocaleString()}`
  );

  const getOrderMsg = (design: Design) => encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want to order the "${design.name}" T-Shirt:\n• Size: ${selectedSize || "Not selected"}\n• Color: ${selectedColor.name}\n• Side: ${side}\n• Qty: ${quantity}\n• Price: PKR ${design.price.toLocaleString()}`
  );

  const getCustomizeMsg = (design: Design) => encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want to customize the "${design.name}" T-Shirt:\n• Size: ${selectedSize || "Not selected"}\n• Color: ${selectedColor.name}\n• Side: ${side}\n• Qty: ${quantity}\n• Custom Text: ${customText || "None"}\n• Price: PKR ${design.price.toLocaleString()}`
  );

  // Render order-same or customize detail view
  const renderDetailView = (design: Design, mode: "order-same" | "customize") => {
    const isCustomize = mode === "customize";
    const msg = isCustomize ? getCustomizeMsg(design) : getOrderMsg(design);

    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={handleBackToGallery} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Gallery
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Design image */}
          <div className="bg-white border border-border rounded-sm overflow-hidden">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={design.image} alt={design.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl text-foreground">{design.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{design.description}</p>
              <p className="text-primary font-bold text-xl mt-2">PKR {design.price.toLocaleString()}</p>
            </div>

            {/* Print Side */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                Print Side
              </h3>
              <div className="flex gap-2">
                {(["front", "back"] as const).map((s) => (
                  <button key={s} onClick={() => setSide(s)}
                    className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all capitalize ${side === s ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                Shirt Color: <span className="text-muted-foreground font-normal">{selectedColor.name}</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {shirtColors.map((c) => (
                  <button key={c.name} onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor.name === c.name ? "border-primary scale-110 ring-2 ring-primary/40" : "border-border hover:border-muted-foreground"}`}
                    style={{ backgroundColor: c.hex }} title={c.name} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`min-w-[42px] h-9 px-3 rounded-sm text-sm font-semibold border transition-all ${selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Text (only in customize mode) */}
            {isCustomize && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  Custom Text <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                </h3>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter custom text to print..."
                  className="w-full border border-border rounded-sm px-3 py-2.5 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{isCustomize ? "5" : "4"}</span>
                Quantity
              </h3>
              <div className="flex items-center border border-border rounded-sm w-fit">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-secondary">−</button>
                <span className="w-10 text-center text-foreground font-semibold text-sm">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-secondary">+</button>
              </div>
            </div>

            {/* Order Summary & Button */}
            <div className="bg-secondary/50 rounded-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-muted-foreground text-sm">Color: {selectedColor.name} · Size: {selectedSize || "—"}</p>
                  <p className="text-muted-foreground text-xs">Side: {side} · Qty: {quantity}</p>
                  {isCustomize && customText && <p className="text-muted-foreground text-xs">Text: {customText}</p>}
                </div>
                <p className="text-primary font-bold text-xl">PKR {design.price.toLocaleString()}</p>
              </div>
              <a href={`https://wa.me/923271497570?text=${msg}`} target="_blank" rel="noopener noreferrer"
                className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white py-3 rounded-sm font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                <MessageCircle size={18} /> Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom <span className="text-gradient-neon">T-Shirts</span></h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">Browse ready-to-print designs or upload your own custom design.</p>

          {/* Only show tabs when in gallery/custom mode */}
          {(viewMode === "gallery" || viewMode === "custom") && (
            <div className="flex justify-center gap-2 mb-10">
              <button onClick={() => { setActiveTab("gallery"); setViewMode("gallery"); setClickedDesign(null); }}
                className={`px-6 py-2.5 rounded-sm text-sm font-semibold border transition-all ${activeTab === "gallery" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                Design Gallery
              </button>
              <button onClick={() => { setActiveTab("custom"); setViewMode("custom"); setClickedDesign(null); }}
                className={`px-6 py-2.5 rounded-sm text-sm font-semibold border transition-all ${activeTab === "custom" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                Upload Your Design
              </button>
            </div>
          )}

          {/* Gallery with choice overlay */}
          {viewMode === "gallery" && activeTab === "gallery" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((d) => (
                <div key={d.id} className="relative bg-card border border-border rounded-sm overflow-hidden card-hover shadow-sm">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white cursor-pointer" onClick={() => handleDesignClick(d)}>
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" loading="lazy" />

                    {/* Choice overlay */}
                    {clickedDesign?.id === d.id && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 animate-in fade-in duration-200">
                        <button onClick={(e) => { e.stopPropagation(); setClickedDesign(null); }}
                          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
                          <X size={20} />
                        </button>
                        <p className="text-foreground font-semibold text-sm mb-1 text-center">{d.name}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleOrderSame(d); }}
                          className="w-full max-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-sm font-body font-semibold text-sm flex items-center justify-center gap-2 transition-all">
                          <ShoppingBag size={16} /> Order Same Product
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCustomize(d); }}
                          className="w-full max-w-[200px] bg-secondary hover:bg-secondary/80 text-foreground border border-border py-2.5 rounded-sm font-body font-semibold text-sm flex items-center justify-center gap-2 transition-all">
                          <Edit3 size={16} /> Add Your Information
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-body font-semibold text-foreground mb-1">{d.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{d.description}</p>
                    <p className="text-primary font-bold text-lg">PKR {d.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Same Product view */}
          {viewMode === "order-same" && clickedDesign && renderDetailView(clickedDesign, "order-same")}

          {/* Customize view */}
          {viewMode === "customize" && clickedDesign && renderDetailView(clickedDesign, "customize")}

          {/* Upload Your Design tab */}
          {viewMode === "gallery" && activeTab === "custom" && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Upload */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
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

              {/* Print Side */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Print Side
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => setSide("front")}
                    className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all ${side === "front" ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                    Front
                  </button>
                  <button onClick={() => setSide("back")}
                    className={`px-4 py-2 rounded-sm text-sm font-semibold border transition-all ${side === "back" ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                    Back
                  </button>
                </div>
              </div>

              {/* Color */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Shirt Color: <span className="text-muted-foreground text-sm font-normal">{selectedColor.name}</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {shirtColors.map((c) => (
                    <button key={c.name} onClick={() => setSelectedColor(c)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor.name === c.name ? "border-primary scale-110 ring-2 ring-primary/40" : "border-border hover:border-muted-foreground"}`}
                      style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Select Size
                </h2>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className={`min-w-[44px] h-10 px-3 rounded-sm text-sm font-semibold border transition-all ${selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Quantity
                </h2>
                <div className="flex items-center border border-border rounded-sm w-fit">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary">−</button>
                  <span className="w-12 text-center text-foreground font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary">+</button>
                </div>
              </div>

              {/* Order */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  Place Order
                </h2>
                <div className="bg-secondary/50 rounded-sm p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">Color: {selectedColor.name} · Size: {selectedSize || "—"}</p>
                      <p className="text-muted-foreground text-xs">Side: {side} · Qty: {quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-xs">Starting from</p>
                      <p className="text-primary font-bold text-2xl">PKR {startingPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <a href={`https://wa.me/923271497570?text=${customTabMsg}`} target="_blank" rel="noopener noreferrer"
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