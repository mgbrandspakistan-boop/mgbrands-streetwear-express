import { useState, useRef } from "react";
import { MessageCircle, Upload, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCustomizer from "@/components/ProductCustomizer";
import walletLeather from "@/assets/wallet-leather.jpg";
import walletCardHolder from "@/assets/wallet-card-holder.jpg";
import walletZipper from "@/assets/wallet-zipper.jpg";
import walletMinimal from "@/assets/wallet-minimal.jpg";
import walletLong from "@/assets/wallet-long.jpg";

const walletTypes = [
  { id: "leather", productId: "MG-061", name: "Leather Wallet", image: walletLeather, price: 2499 },
  { id: "card-holder", productId: "MG-062", name: "Card Holder Wallet", image: walletCardHolder, price: 1799 },
  { id: "zipper", productId: "MG-063", name: "Zipper Wallet", image: walletZipper, price: 2799 },
  { id: "minimal", productId: "MG-064", name: "Minimal Wallet", image: walletMinimal, price: 1999 },
  { id: "long", productId: "MG-065", name: "Long Wallet", image: walletLong, price: 3299 },
];

const walletColors = [
  { name: "Black", hex: "#222222" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Dark Brown", hex: "#5C3317" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Navy", hex: "#1a1a3e" },
];

const CustomWalletDesign = () => {
  const [selectedWallet, setSelectedWallet] = useState(walletTypes[0]);
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
    `Assalamualaikum MG Brands!\nI want a Custom Wallet:\n• Product ID: ${selectedWallet.productId}\n• Type: ${selectedWallet.name}\n• Color: ${selectedColor || "Not selected"}\n• Custom Text: ${customText || "Not specified"}\n• Design: ${fileName || "Will share on chat"}\n• Price: PKR ${selectedWallet.price.toLocaleString()}`
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">
            Custom <span className="text-gradient-neon">Wallet Design</span>
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Select your wallet type, choose a color, add custom text or logo, and place your order.
          </p>

          {/* Step 1: Select Wallet Type */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Select Wallet Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {walletTypes.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => setSelectedWallet(wallet)}
                  className={`relative bg-card border rounded-sm overflow-hidden transition-all ${
                    selectedWallet.id === wallet.id
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-white">
                    <img src={wallet.image} alt={wallet.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  {selectedWallet.id === wallet.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-[10px] text-muted-foreground font-mono text-center">{wallet.productId}</p>
                    <p className="text-xs font-medium text-foreground text-center leading-tight">{wallet.name}</p>
                    <p className="text-xs text-primary font-bold text-center mt-1">PKR {wallet.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Design Editor */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">★</span>
              Design Editor — Drag, Zoom &amp; Rotate Preview
            </h2>
            <ProductCustomizer
              productType="wallet"
              baseImage={selectedWallet.image}
              productName={selectedWallet.name}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Preview */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">★</span>
                Preview
              </h2>
              <div className="bg-white border border-border rounded-sm overflow-hidden aspect-square flex items-center justify-center relative">
                {/* Color overlay tint */}
                {selectedColor && (
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-30 pointer-events-none"
                    style={{
                      backgroundColor: walletColors.find((c) => c.name === selectedColor)?.hex || "transparent",
                    }}
                  />
                )}
                <img src={selectedWallet.image} alt={selectedWallet.name} className="w-3/4 h-3/4 object-contain relative z-10" />
                {/* Custom text overlay */}
                {customText && (
                  <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <p
                      className="text-xl sm:text-2xl font-bold tracking-wider uppercase"
                      style={{
                        color: selectedColor === "Tan" || selectedColor === "Brown" ? "#1a1a1a" : "#d4af37",
                        textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                        fontFamily: "serif",
                      }}
                    >
                      {customText}
                    </p>
                  </div>
                )}
                {/* Uploaded design overlay */}
                {designPreview && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <img src={designPreview} alt="Your design" className="w-1/4 h-1/4 object-contain opacity-80 rounded-sm" />
                  </div>
                )}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-2">
                {selectedWallet.name}
                {selectedColor ? ` — ${selectedColor}` : ""}
              </p>
            </div>

            {/* Right: Options */}
            <div className="space-y-6">
              {/* Step 2: Color */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Select Color: <span className="text-muted-foreground text-sm font-normal">{selectedColor || "Not selected"}</span>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {walletColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? "border-primary scale-110 ring-2 ring-primary/40"
                          : "border-border hover:border-muted-foreground"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Step 3: Custom Text */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Add Name / Initials (Optional)
                </h2>
                <input
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder='e.g. "Ali Khan" or "AK"'
                  maxLength={20}
                  className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-1">Text will appear on the wallet preview above.</p>
              </div>

              {/* Step 4: Upload Logo / Design */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Upload Logo / Design (Optional)
                </h2>
                <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-sm py-6 cursor-pointer hover:border-primary transition-colors bg-card">
                  <Upload size={24} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{fileName || "Click to upload (JPG, PNG)"}</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                {designPreview && (
                  <div className="mt-3 flex items-center gap-3">
                    <img src={designPreview} alt="Preview" className="w-16 h-16 object-cover rounded-sm border border-border" />
                    <div>
                      <p className="text-sm text-foreground font-medium">{fileName}</p>
                      <button
                        onClick={() => {
                          setDesignPreview(null);
                          setFileName(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="text-xs text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 5: Place Order */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Place Order
                </h2>
                <div className="bg-secondary/50 rounded-sm p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">Selected: {selectedWallet.name}</p>
                      <p className="text-muted-foreground text-xs">
                        ID: {selectedWallet.productId} · Color: {selectedColor || "—"} · Text: {customText || "—"}
                      </p>
                    </div>
                    <p className="text-primary font-bold text-2xl">PKR {selectedWallet.price.toLocaleString()}</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/923271497570?text=${whatsAppMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white py-3 rounded-sm font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
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

export default CustomWalletDesign;
