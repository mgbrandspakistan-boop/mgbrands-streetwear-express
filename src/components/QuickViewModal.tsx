import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingBag, Star, Minus, Plus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, open, onClose }: QuickViewModalProps) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, productId: product.productId, name: product.name, price: product.price, image: product.image, size: selectedSize, color: selectedColor || product.colors[0]?.name });
    }
    onClose();
    resetState();
  };

  const resetState = () => { setSelectedSize(null); setSelectedColor(null); setQuantity(1); setSizeError(false); };
  const handleClose = () => { onClose(); resetState(); };

  const whatsAppMsg = encodeURIComponent(
    `Assalamualaikum MG Brands!\nI want to order:\n• Product: ${product.name}\n• Product ID: ${product.productId}\n• Size: ${selectedSize || "Not selected"}\n• Color: ${selectedColor || product.colors[0]?.name || "Default"}\n• Qty: ${quantity}\n• Price: PKR ${(product.price * quantity).toLocaleString()}`
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-4xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[500px] overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-1">{product.productId}</p>
              <h3 className="font-display text-2xl sm:text-3xl text-foreground">{product.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"} />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-primary font-bold text-2xl sm:text-3xl">PKR {product.price.toLocaleString()}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

            {/* Material */}
            <div className="bg-secondary/50 rounded-sm p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Material & Manufacturing</p>
              <p className="text-foreground text-sm">{product.material}</p>
            </div>

            {/* Colors */}
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Color: <span className="text-foreground">{selectedColor || "Select"}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => setSelectedColor(c.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${selectedColor === c.name ? "border-primary scale-110 ring-2 ring-primary/40" : "border-border hover:border-muted-foreground"}`}
                    style={{ backgroundColor: c.hex }} title={c.name} />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Size: <span className="text-foreground">{selectedSize || "Select"}</span>
                {sizeError && <span className="text-destructive ml-2 text-xs">Please select a size</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false); }}
                    className={`min-w-[44px] h-10 px-3 rounded-sm text-sm font-semibold border transition-all duration-200 ${selectedSize === s ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:border-primary"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Quantity</p>
              <div className="flex items-center border border-border rounded-sm w-fit">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"><Minus size={16} /></button>
                <span className="w-12 text-center text-foreground font-semibold">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"><Plus size={16} /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-auto">
              <button onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground py-3 font-body font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 rounded-sm">
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <a href={`https://wa.me/923271497570?text=${whatsAppMsg}`} target="_blank" rel="noopener noreferrer"
                className="bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white px-5 py-3 rounded-sm font-body font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
