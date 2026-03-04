import { useState } from "react";
import { MessageCircle, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import customMug1 from "@/assets/custom-mug-1.jpg";
import customMug2 from "@/assets/custom-mug-2.jpg";
import customMug3 from "@/assets/custom-mug-3.jpg";

const mugGallery = [
  { id: 1, name: "Personalized Name Mug", image: customMug1 },
  { id: 2, name: "Photo Print Mug", image: customMug2 },
  { id: 3, name: "Quote Mug", image: customMug3 },
];

const CustomMugPrint = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const price = 999;
  const whatsAppMsg = encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want a Custom Mug:\n• Name on Mug: ${name || "Not specified"}\n• Message: ${message || "None"}\n• Image: ${fileName || "Will share on chat"}\n• Price: PKR ${price.toLocaleString()}`
  );

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground text-center mb-4">Custom Mug <span className="text-gradient-neon">Print</span></h1>
          <p className="text-muted-foreground text-center mb-10">Design your own personalized mug with a name, image, and custom message.</p>

          {/* Mug Gallery */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {mugGallery.map((mug) => (
              <div key={mug.id} className="bg-white border border-border rounded-sm overflow-hidden shadow-sm">
                <div className="aspect-square overflow-hidden bg-white">
                  <img src={mug.image} alt={mug.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-xs text-muted-foreground text-center py-2 font-medium">{mug.name}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-sm p-6 space-y-5">
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
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Upload Image</p>
              <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-sm py-8 cursor-pointer hover:border-primary transition-colors">
                <Upload size={24} className="text-muted-foreground" />
                <span className="text-muted-foreground text-sm">{fileName || "Click to upload image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} />
              </label>
            </div>

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

export default CustomMugPrint;
