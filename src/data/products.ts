import productHoodie1 from "@/assets/product-hoodie-1.jpg";
import productHoodie2 from "@/assets/product-hoodie-2.jpg";
import productHoodie3 from "@/assets/product-hoodie-3.jpg";
import productTee1 from "@/assets/product-tee-1.jpg";
import productTee2 from "@/assets/product-tee-2.jpg";
import productTee3 from "@/assets/product-tee-3.jpg";

export type ProductCategory = "hoodies" | "tshirts" | "sweatshirts" | "jackets" | "streetwear-sets" | "new-arrivals";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  badge?: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  material: string;
  description: string;
  rating: number;
  reviews: number;
}

const defaultColors = [
  { name: "Black", hex: "#111" },
  { name: "Charcoal", hex: "#333" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Maroon", hex: "#5a0a0a" },
  { name: "Forest Green", hex: "#1a3a1a" },
  { name: "Slate Grey", hex: "#555" },
  { name: "Coffee", hex: "#3c1e0e" },
];

const teeColors = [
  { name: "Black", hex: "#111" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Charcoal", hex: "#333" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Maroon", hex: "#5a0a0a" },
  { name: "Sand", hex: "#c2a878" },
];

const jacketColors = [
  { name: "Black", hex: "#111" },
  { name: "Charcoal", hex: "#333" },
  { name: "Navy", hex: "#0d1b3e" },
  { name: "Olive", hex: "#3a3a1a" },
  { name: "Burgundy", hex: "#5c1a2a" },
  { name: "Graphite", hex: "#2a2a2a" },
  { name: "Storm Grey", hex: "#4a4a4a" },
];

const setColors = [
  { name: "Black", hex: "#111" },
  { name: "Charcoal", hex: "#333" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Mocha", hex: "#3e2a1a" },
  { name: "Ash Grey", hex: "#6e6e6e" },
  { name: "Sand", hex: "#c2a878" },
];

export const products: Product[] = [
  // ── Existing Products ──
  {
    id: "1", name: "Classic Black Hoodie", price: 3499, image: productHoodie1, category: "hoodies", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    colors: defaultColors,
    material: "80% Cotton, 20% Polyester — Heavyweight 350 GSM, Stitched in Pakistan",
    description: "Oversized streetwear hoodie with premium fleece lining. Ribbed cuffs and hem for a snug fit. Kangaroo pocket and adjustable drawstring hood.",
    rating: 4.8, reviews: 124,
  },
  {
    id: "2", name: "Neon Edge Hoodie", price: 3999, image: productHoodie2, category: "hoodies", badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#111" }, { name: "Dark Green", hex: "#1a3a1a" }, { name: "Navy", hex: "#1a1a3e" }, { name: "Burgundy", hex: "#5c1a2a" }, { name: "Storm Grey", hex: "#4a4a4a" }, { name: "Midnight Blue", hex: "#0d1b3e" }, { name: "Olive", hex: "#3a3a1a" }],
    material: "100% French Terry Cotton — 320 GSM, Stitched in Pakistan",
    description: "Bold neon accent stitching on a matte black base. Drop shoulders with a boxy fit. Double-layered hood for extra warmth.",
    rating: 4.9, reviews: 87,
  },
  {
    id: "3", name: "Charcoal Oversized Hoodie", price: 4499, image: productHoodie3, category: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#333" }, { name: "Slate", hex: "#555" }, { name: "Black", hex: "#111" }, { name: "Ash Grey", hex: "#6e6e6e" }, { name: "Mocha", hex: "#3e2a1a" }, { name: "Deep Navy", hex: "#0f1a3a" }, { name: "Graphite", hex: "#2a2a2a" }],
    material: "100% Organic Cotton — 380 GSM, Premium Stitched in Pakistan",
    description: "Ultra-premium oversized hoodie with a relaxed silhouette. Side seam pockets and elongated sleeves. Washed finish for a vintage streetwear look.",
    rating: 4.7, reviews: 56,
  },
  {
    id: "4", name: "Stealth Black Tee", price: 1499, image: productTee1, category: "tshirts",
    sizes: ["S", "M", "L", "XL"],
    colors: teeColors,
    material: "100% Combed Cotton — 180 GSM, Stitched in Pakistan",
    description: "Clean minimal tee with a relaxed fit. Pre-shrunk fabric with reinforced collar. Perfect base layer for any streetwear look.",
    rating: 4.6, reviews: 203,
  },
  {
    id: "5", name: "Urban Graphic Tee", price: 1699, image: productTee2, category: "tshirts", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#111" }, { name: "Off White", hex: "#eee" }, { name: "Grey", hex: "#888" }, { name: "Navy", hex: "#1a1a3e" }, { name: "Rust", hex: "#8b3a1a" }, { name: "Sage", hex: "#6b7a5e" }, { name: "Cream", hex: "#e8d8c0" }],
    material: "100% Ring-Spun Cotton — 200 GSM, DTG Printed in Pakistan",
    description: "Premium graphic tee with exclusive MG Brands artwork. Soft hand-feel print that lasts. Slightly oversized fit for modern streetwear styling.",
    rating: 4.9, reviews: 312,
  },
  {
    id: "6", name: "Olive Street Tee", price: 1599, image: productTee3, category: "tshirts", badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Olive", hex: "#556B2F" }, { name: "Black", hex: "#111" }, { name: "Tan", hex: "#a68a64" }, { name: "Forest Green", hex: "#2a4a2a" }, { name: "Charcoal", hex: "#333" }, { name: "Clay", hex: "#8b6b4a" }, { name: "Stone", hex: "#7a7a6e" }],
    material: "100% Cotton — 190 GSM, Garment Dyed in Pakistan",
    description: "Earthy olive tone with a washed finish for a vintage feel. Reinforced shoulders and taped neck seam. Pairs perfectly with cargo pants or joggers.",
    rating: 4.5, reviews: 98,
  },

  // ── NEW HOODIES (7-12) ──
  {
    id: "7", name: "Phantom Zip-Up Hoodie", price: 3999, image: productHoodie1, category: "hoodies",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "85% Cotton, 15% Polyester — 340 GSM, Stitched in Pakistan",
    description: "Full-zip hoodie with a clean phantom black finish. Metal YKK zipper and split kangaroo pockets. Tapered fit with ribbed waistband.",
    rating: 4.7, reviews: 68,
  },
  {
    id: "8", name: "Midnight Velour Hoodie", price: 4499, image: productHoodie2, category: "hoodies", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "Velour Cotton Blend — 360 GSM, Stitched in Pakistan",
    description: "Luxurious velour texture with a matte midnight finish. Oversized silhouette with dropped shoulders. Embossed MG logo on chest.",
    rating: 4.8, reviews: 45,
  },
  {
    id: "9", name: "Arctic Fleece Hoodie", price: 4299, image: productHoodie3, category: "hoodies",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% Heavy Fleece Cotton — 400 GSM, Stitched in Pakistan",
    description: "Heavyweight fleece-lined hoodie built for cold weather. Double-stitched seams with reinforced hood. Ultra-warm without the bulk.",
    rating: 4.6, reviews: 92,
  },
  {
    id: "10", name: "Shadow Pullover Hoodie", price: 3699, image: productHoodie1, category: "hoodies",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "80% Cotton, 20% Polyester — 330 GSM, Stitched in Pakistan",
    description: "Minimalist pullover with tonal shadow branding. Relaxed boxy fit with elongated sleeves. Perfect layering piece for urban fits.",
    rating: 4.5, reviews: 73,
  },

  // ── NEW T-SHIRTS (11-16) ──
  {
    id: "11", name: "Concrete Jungle Tee", price: 1799, image: productTee1, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Combed Cotton — 200 GSM, Screen Printed in Pakistan",
    description: "Urban-inspired graphic with concrete texture print. Dropped shoulders with a boxy cut. Pre-washed for instant softness.",
    rating: 4.7, reviews: 156,
  },
  {
    id: "12", name: "Noir Essential Tee", price: 1499, image: productTee2, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Pima Cotton — 180 GSM, Stitched in Pakistan",
    description: "The perfect black tee redefined. Pima cotton for ultimate softness. Slightly elongated hem for a modern streetwear silhouette.",
    rating: 4.8, reviews: 241,
  },
  {
    id: "13", name: "Washed Slate Tee", price: 1699, image: productTee3, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Cotton — 190 GSM, Acid Washed in Pakistan",
    description: "Acid-washed slate grey for a vintage distressed look. Reinforced collar and shoulder seams. Oversized relaxed fit.",
    rating: 4.4, reviews: 89,
  },
  {
    id: "14", name: "Midnight Stripe Tee", price: 1899, image: productTee1, category: "tshirts", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Ring-Spun Cotton — 210 GSM, Yarn-Dyed in Pakistan",
    description: "Subtle tonal stripe pattern on a dark base. Yarn-dyed for lasting color depth. Tailored boxy fit with raw hem finish.",
    rating: 4.6, reviews: 67,
  },
  {
    id: "15", name: "Graffiti Tag Tee", price: 1999, image: productTee2, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Cotton — 200 GSM, DTG Printed in Pakistan",
    description: "Exclusive graffiti-style MG Brands artwork. High-definition DTG print that won't crack or fade. Oversized streetwear fit.",
    rating: 4.9, reviews: 178,
  },
  {
    id: "16", name: "Raw Edge Longline Tee", price: 1799, image: productTee3, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Organic Cotton — 190 GSM, Stitched in Pakistan",
    description: "Elongated longline tee with raw-cut hem. Curved bottom for layered styling. Organic cotton for eco-conscious streetwear.",
    rating: 4.5, reviews: 104,
  },

  // ── SWEATSHIRTS (17-22) ──
  {
    id: "17", name: "Oversized Crew Sweatshirt", price: 3299, image: productHoodie1, category: "sweatshirts", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "80% Cotton, 20% Polyester — 320 GSM, Stitched in Pakistan",
    description: "Classic crew neck sweatshirt with an oversized fit. Brushed fleece interior for warmth. Ribbed cuffs and waistband.",
    rating: 4.8, reviews: 145,
  },
  {
    id: "18", name: "Vintage Wash Sweatshirt", price: 3499, image: productHoodie2, category: "sweatshirts",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% French Terry Cotton — 300 GSM, Garment Dyed in Pakistan",
    description: "Sun-faded vintage wash for a worn-in aesthetic. Relaxed drop-shoulder fit. Subtle embroidered MG logo on chest.",
    rating: 4.7, reviews: 98,
  },
  {
    id: "19", name: "Tech Fleece Crewneck", price: 3799, image: productHoodie3, category: "sweatshirts", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "Cotton-Poly Tech Fleece — 340 GSM, Stitched in Pakistan",
    description: "Engineered tech fleece with moisture-wicking properties. Articulated sleeves for mobility. Modern athletic silhouette.",
    rating: 4.6, reviews: 72,
  },
  {
    id: "20", name: "Distressed Edge Sweatshirt", price: 3599, image: productHoodie1, category: "sweatshirts",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% Cotton — 310 GSM, Distressed in Pakistan",
    description: "Intentionally distressed edges and raw hems. Heavy cotton construction with a boxy silhouette. Washed for a broken-in feel.",
    rating: 4.5, reviews: 64,
  },
  {
    id: "21", name: "Colorblock Crew Sweatshirt", price: 3399, image: productHoodie2, category: "sweatshirts",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "80% Cotton, 20% Polyester — 320 GSM, Stitched in Pakistan",
    description: "Tonal colorblock panels with contrast stitching. Dropped shoulders with a relaxed crew neck. Premium brushed interior.",
    rating: 4.4, reviews: 53,
  },
  {
    id: "22", name: "Embossed Logo Sweatshirt", price: 3699, image: productHoodie3, category: "sweatshirts", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% Organic Cotton — 350 GSM, Stitched in Pakistan",
    description: "3D embossed MG Brands logo on the chest. Heavyweight organic cotton with a structured fit. Luxury streetwear essential.",
    rating: 4.9, reviews: 112,
  },

  // ── JACKETS (23-28) ──
  {
    id: "23", name: "Urban Bomber Jacket", price: 4999, image: productHoodie1, category: "jackets", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "Nylon Shell, Polyester Lining — Stitched in Pakistan",
    description: "Classic bomber silhouette with ribbed collar, cuffs, and hem. Satin-finish nylon shell with quilted lining. Two side pockets and interior pocket.",
    rating: 4.8, reviews: 89,
  },
  {
    id: "24", name: "Stealth Windbreaker", price: 4499, image: productHoodie2, category: "jackets", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "100% Ripstop Nylon — Water-Resistant, Stitched in Pakistan",
    description: "Lightweight water-resistant windbreaker with packable hood. Half-zip front with bungee-cord hem. Reflective MG logo for night visibility.",
    rating: 4.7, reviews: 67,
  },
  {
    id: "25", name: "Cargo Utility Jacket", price: 4799, image: productHoodie3, category: "jackets",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "Cotton Canvas — Heavy Duty, Stitched in Pakistan",
    description: "Military-inspired utility jacket with multiple cargo pockets. Heavy-duty cotton canvas construction. Adjustable waist tabs for a customized fit.",
    rating: 4.6, reviews: 54,
  },
  {
    id: "26", name: "Puffer Street Jacket", price: 4999, image: productHoodie1, category: "jackets", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "Nylon Shell, Synthetic Fill — Stitched in Pakistan",
    description: "Lightweight puffer jacket with synthetic insulation. Stand-up collar with concealed hood. Clean streetwear lines with a cropped fit.",
    rating: 4.9, reviews: 76,
  },
  {
    id: "27", name: "Denim Trucker Jacket", price: 4599, image: productHoodie2, category: "jackets",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "100% Denim Cotton — 12oz, Stitched in Pakistan",
    description: "Classic trucker jacket in heavyweight denim. Vintage-washed with subtle distressing. Button-front with dual chest pockets.",
    rating: 4.5, reviews: 48,
  },
  {
    id: "28", name: "Tech Shell Jacket", price: 4699, image: productHoodie3, category: "jackets",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "3-Layer Technical Fabric — Waterproof, Stitched in Pakistan",
    description: "Performance shell jacket with sealed seams. Waterproof breathable fabric for all conditions. Minimalist design with hidden zip pockets.",
    rating: 4.7, reviews: 61,
  },

  // ── STREETWEAR SETS (29-36) ──
  {
    id: "29", name: "Shadow Tracksuit Set", price: 4999, image: productHoodie1, category: "streetwear-sets", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "80% Cotton, 20% Polyester — 320 GSM, Stitched in Pakistan",
    description: "Matching hoodie and jogger set in shadow black. Brushed fleece interior with tapered jogger fit. Coordinated for effortless streetwear styling.",
    rating: 4.9, reviews: 134,
  },
  {
    id: "30", name: "Velour Lounge Set", price: 4799, image: productHoodie2, category: "streetwear-sets", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "Velour Cotton Blend — 300 GSM, Stitched in Pakistan",
    description: "Luxurious velour zip-up jacket and matching pants. Soft-touch fabric with a premium sheen. Relaxed fit for comfort and style.",
    rating: 4.8, reviews: 87,
  },
  {
    id: "31", name: "Tech Fleece Combo", price: 4999, image: productHoodie3, category: "streetwear-sets",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "Cotton-Poly Tech Fleece — 340 GSM, Stitched in Pakistan",
    description: "Performance tech fleece crewneck with matching joggers. Engineered for warmth without weight. Tapered leg with zip ankle cuffs.",
    rating: 4.7, reviews: 92,
  },
  {
    id: "32", name: "Cargo Duo Set", price: 4899, image: productHoodie1, category: "streetwear-sets", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "100% Cotton — 280 GSM, Stitched in Pakistan",
    description: "Oversized tee paired with matching cargo joggers. Utility pockets on the joggers for a functional look. Washed finish for vintage vibes.",
    rating: 4.6, reviews: 65,
  },
  {
    id: "33", name: "Monochrome Zip Set", price: 4699, image: productHoodie2, category: "streetwear-sets",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "French Terry Cotton — 310 GSM, Stitched in Pakistan",
    description: "Full-zip hoodie with matching straight-leg pants. Monochrome tonal design with embossed branding. Clean lines and premium construction.",
    rating: 4.5, reviews: 58,
  },
  {
    id: "34", name: "Urban Runner Set", price: 4599, image: productHoodie3, category: "streetwear-sets",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "Moisture-Wicking Poly Blend — 260 GSM, Stitched in Pakistan",
    description: "Lightweight half-zip top with slim joggers. Quick-dry fabric ideal for active streetwear. Reflective accents for night visibility.",
    rating: 4.4, reviews: 43,
  },

  // ── Extra Products to reach 36 total ──
  {
    id: "35", name: "Distressed Denim Jacket", price: 4899, image: productHoodie1, category: "jackets",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "100% Raw Denim — 14oz, Stitched in Pakistan",
    description: "Raw selvedge denim jacket with natural wear-in potential. Heavy 14oz construction that molds to your body. MG Brands leather patch on back.",
    rating: 4.6, reviews: 37,
  },
  {
    id: "36", name: "Essential Crewneck Sweatshirt", price: 2999, image: productHoodie3, category: "sweatshirts",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% Loopback Cotton — 300 GSM, Stitched in Pakistan",
    description: "Everyday essential crewneck in premium loopback cotton. Classic fit with ribbed trims. Minimal branding for versatile styling.",
    rating: 4.6, reviews: 167,
  },
];
