import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, Type, RotateCcw, ZoomIn, ZoomOut, X, Move, Palette, ChevronLeft, ChevronRight } from "lucide-react";

interface DesignOverlay {
  type: "image" | "text";
  content: string; // URL for image, text for text
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  rotation: number;
}

type ProductSide = "front" | "back" | "left" | "right";

interface ProductCustomizerProps {
  productType: "tshirt" | "mug" | "wallet" | "keychain" | "stamp";
  baseImage: string;
  backImage?: string;
  productName: string;
  baseColor?: string;
  onDesignComplete?: (overlays: DesignOverlay[], side: ProductSide) => void;
}

const fontOptions = [
  { name: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { name: "Bebas Neue", value: "'Bebas Neue', sans-serif" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Courier", value: "'Courier New', monospace" },
  { name: "Impact", value: "Impact, sans-serif" },
];

const colorOptions = [
  "#ffffff", "#000000", "#dc2626", "#2563eb", "#16a34a",
  "#DAA520", "#ec4899", "#7c3aed", "#ea580c", "#06b6d4",
];

const sideLabels: Record<string, Record<string, string>> = {
  tshirt: { front: "Front", back: "Back" },
  mug: { front: "Front", back: "Back", left: "Left Side", right: "Right Side" },
  wallet: { front: "Front" },
  keychain: { front: "Front" },
  stamp: { front: "Top View" },
};

const ProductCustomizer = ({ productType, baseImage, backImage, productName, baseColor, onDesignComplete }: ProductCustomizerProps) => {
  const [overlays, setOverlays] = useState<Record<ProductSide, DesignOverlay[]>>({ front: [], back: [], left: [], right: [] });
  const [activeSide, setActiveSide] = useState<ProductSide>("front");
  const [rotateY, setRotateY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showTextInput, setShowTextInput] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedOverlay, setSelectedOverlay] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentOverlays = overlays[activeSide] || [];

  const addImageOverlay = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const newOverlay: DesignOverlay = {
      type: "image",
      content: url,
      x: 30,
      y: 30,
      width: 40,
      height: 40,
      rotation: 0,
    };
    setOverlays((prev) => ({
      ...prev,
      [activeSide]: [...(prev[activeSide] || []), newOverlay],
    }));
  }, [activeSide]);

  const addTextOverlay = () => {
    if (!textValue.trim()) return;
    const newOverlay: DesignOverlay = {
      type: "text",
      content: textValue,
      x: 25,
      y: 50,
      width: 50,
      height: 15,
      fontSize: 24,
      fontFamily: selectedFont,
      color: selectedColor,
      rotation: 0,
    };
    setOverlays((prev) => ({
      ...prev,
      [activeSide]: [...(prev[activeSide] || []), newOverlay],
    }));
    setTextValue("");
    setShowTextInput(false);
  };

  const removeOverlay = (index: number) => {
    setOverlays((prev) => ({
      ...prev,
      [activeSide]: prev[activeSide].filter((_, i) => i !== index),
    }));
    setSelectedOverlay(null);
  };

  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(index);
    setSelectedOverlay(index);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const overlay = currentOverlays[index];
      const percentX = ((e.clientX - rect.left) / rect.width) * 100;
      const percentY = ((e.clientY - rect.top) / rect.height) * 100;
      setDragOffset({ x: percentX - overlay.x, y: percentY - overlay.y });
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging === null || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;
    setOverlays((prev) => {
      const updated = [...prev[activeSide]];
      updated[dragging] = {
        ...updated[dragging],
        x: Math.max(0, Math.min(100 - updated[dragging].width, percentX - dragOffset.x)),
        y: Math.max(0, Math.min(100 - updated[dragging].height, percentY - dragOffset.y)),
      };
      return { ...prev, [activeSide]: updated };
    });
  }, [dragging, activeSide, dragOffset]);

  const handleMouseUp = () => setDragging(null);

  const handleTouchStart = (index: number, e: React.TouchEvent) => {
    e.preventDefault();
    setDragging(index);
    setSelectedOverlay(index);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      const overlay = currentOverlays[index];
      const percentX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      const percentY = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
      setDragOffset({ x: percentX - overlay.x, y: percentY - overlay.y });
    }
  };

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (dragging === null || !canvasRef.current || !e.touches[0]) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const percentX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
    setOverlays((prev) => {
      const updated = [...prev[activeSide]];
      updated[dragging] = {
        ...updated[dragging],
        x: Math.max(0, Math.min(100 - updated[dragging].width, percentX - dragOffset.x)),
        y: Math.max(0, Math.min(100 - updated[dragging].height, percentY - dragOffset.y)),
      };
      return { ...prev, [activeSide]: updated };
    });
  }, [dragging, activeSide, dragOffset]);

  const sides = Object.entries(sideLabels[productType] || { front: "Front" });

  const currentImage = activeSide === "back" && backImage ? backImage : baseImage;

  const rotate3D = (dir: "left" | "right") => {
    setRotateY((prev) => prev + (dir === "right" ? 30 : -30));
  };

  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-secondary/30">
        <h3 className="font-body font-semibold text-foreground text-sm">Design Editor — {productName}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Upload images, add text, drag to position</p>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Preview Canvas */}
        <div className="flex-1 p-4" style={{ perspective: "800px" }}>
          {/* Side Tabs */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {sides.map(([key, label]) => (
              <button key={key} onClick={() => setActiveSide(key as ProductSide)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-all ${activeSide === key ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}>
                {label}
              </button>
            ))}
          </div>

          {/* 3D Preview Container */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <button onClick={() => rotate3D("left")} className="p-1.5 rounded-sm bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setRotateY(0)} className="p-1.5 rounded-sm bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
              <RotateCcw size={16} />
            </button>
            <button onClick={() => rotate3D("right")} className="p-1.5 rounded-sm bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
              <ChevronRight size={16} />
            </button>
            <div className="w-px h-5 bg-border mx-1" />
            <button onClick={() => setZoom((z) => Math.min(z + 0.1, 2))} className="p-1.5 rounded-sm bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
              <ZoomIn size={16} />
            </button>
            <button onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))} className="p-1.5 rounded-sm bg-secondary text-secondary-foreground hover:bg-muted transition-colors">
              <ZoomOut size={16} />
            </button>
          </div>

          {/* Canvas */}
          <motion.div
            ref={canvasRef}
            className="relative mx-auto bg-white rounded-sm overflow-hidden border border-border cursor-crosshair select-none"
            style={{
              maxWidth: 400,
              aspectRatio: productType === "mug" ? "4/3" : "3/4",
              transform: `rotateY(${rotateY}deg) scale(${zoom})`,
              transformStyle: "preserve-3d",
              transition: "transform 0.4s ease",
              backgroundColor: baseColor || "#ffffff",
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <img src={currentImage} alt={productName} className="w-full h-full object-cover pointer-events-none" draggable={false} />

            {/* Overlays */}
            {currentOverlays.map((overlay, i) => (
              <div
                key={i}
                className={`absolute cursor-move ${selectedOverlay === i ? "ring-2 ring-primary" : ""}`}
                style={{
                  left: `${overlay.x}%`,
                  top: `${overlay.y}%`,
                  width: `${overlay.width}%`,
                  height: `${overlay.height}%`,
                  transform: `rotate(${overlay.rotation}deg)`,
                }}
                onMouseDown={(e) => handleMouseDown(i, e)}
                onTouchStart={(e) => handleTouchStart(i, e)}
              >
                {overlay.type === "image" ? (
                  <img src={overlay.content} alt="Custom design" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center pointer-events-none"
                    style={{
                      fontSize: overlay.fontSize,
                      fontFamily: overlay.fontFamily,
                      color: overlay.color,
                      textShadow: overlay.color === "#ffffff" ? "0 1px 3px rgba(0,0,0,0.5)" : "none",
                      whiteSpace: "nowrap",
                      overflow: "visible",
                    }}
                  >
                    {overlay.content}
                  </div>
                )}
                {selectedOverlay === i && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeOverlay(i); }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center z-10"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}

            {/* Drop zone hint */}
            {currentOverlays.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-sm bg-white/70">
                  <Move size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Upload an image or add text to start designing</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Tools Panel */}
        <div className="w-full lg:w-64 border-t lg:border-t-0 lg:border-l border-border p-4 space-y-4">
          {/* Upload */}
          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 block">Upload Design</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) addImageOverlay(e.target.files[0]); e.target.value = ""; }}
            />
            <button onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors">
              <Upload size={16} /> Upload Photo / Logo
            </button>
          </div>

          {/* Add Text */}
          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 block">Add Text</label>
            {showTextInput ? (
              <div className="space-y-2">
                <input
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Your custom text..."
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
                {/* Font */}
                <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-sm text-foreground">
                  {fontOptions.map((f) => (
                    <option key={f.value} value={f.value}>{f.name}</option>
                  ))}
                </select>
                {/* Color */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Text Color</p>
                  <div className="flex flex-wrap gap-1.5">
                    {colorOptions.map((c) => (
                      <button key={c} onClick={() => setSelectedColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c ? "border-primary scale-110" : "border-border"}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={addTextOverlay} className="flex-1 bg-primary text-primary-foreground py-2 rounded-sm text-sm font-medium">Add</button>
                  <button onClick={() => setShowTextInput(false)} className="px-3 bg-secondary text-secondary-foreground py-2 rounded-sm text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowTextInput(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary text-secondary-foreground rounded-sm text-sm font-medium hover:bg-muted transition-colors border border-border">
                <Type size={16} /> Add Custom Text
              </button>
            )}
          </div>

          {/* Design Color (for base product) */}
          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              <Palette size={12} /> Instructions
            </label>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Drag elements to position them</p>
              <p>• Click an element to select it</p>
              <p>• Use × to remove selected element</p>
              <p>• Rotate the preview with ← → buttons</p>
              <p>• Zoom in/out with +/- buttons</p>
              <p>• Switch sides using the tabs above</p>
            </div>
          </div>

          {/* Overlays List */}
          {currentOverlays.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 block">
                Layers ({currentOverlays.length})
              </label>
              <div className="space-y-1">
                {currentOverlays.map((overlay, i) => (
                  <div key={i}
                    className={`flex items-center gap-2 p-2 rounded-sm text-xs cursor-pointer transition-all ${selectedOverlay === i ? "bg-primary/10 border border-primary" : "bg-secondary/50 border border-transparent hover:bg-secondary"}`}
                    onClick={() => setSelectedOverlay(i)}
                  >
                    <span className="flex-1 truncate text-foreground">
                      {overlay.type === "image" ? "📷 Image" : `✏️ "${overlay.content}"`}
                    </span>
                    <button onClick={(e) => { e.stopPropagation(); removeOverlay(i); }}
                      className="text-muted-foreground hover:text-destructive">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
