import productHoodie1 from "@/assets/product-hoodie-1.jpg";
import productHoodie2 from "@/assets/product-hoodie-2.jpg";
import productHoodie3 from "@/assets/product-hoodie-3.jpg";
import productHoodie4 from "@/assets/product-hoodie-4.jpg";
import productHoodie5 from "@/assets/product-hoodie-5.jpg";
import productHoodie6 from "@/assets/product-hoodie-6.jpg";
import productHoodie7 from "@/assets/product-hoodie-7.jpg";
import productTee1 from "@/assets/product-tee-1.jpg";
import productTee2 from "@/assets/product-tee-2.jpg";
import productTee3 from "@/assets/product-tee-3.jpg";
import productTee4 from "@/assets/product-tee-4.jpg";
import productTee5 from "@/assets/product-tee-5.jpg";
import productTee6 from "@/assets/product-tee-6.jpg";
import productTee7 from "@/assets/product-tee-7.jpg";
import productTee8 from "@/assets/product-tee-8.jpg";
import productSweat1 from "@/assets/product-sweat-1.jpg";
import productSweat2 from "@/assets/product-sweat-2.jpg";
import productSweat3 from "@/assets/product-sweat-3.jpg";
import productSweat4 from "@/assets/product-sweat-4.jpg";
import productSweat5 from "@/assets/product-sweat-5.jpg";
import productSweat6 from "@/assets/product-sweat-6.jpg";
import productSweat7 from "@/assets/product-sweat-7.jpg";
import productJacket1 from "@/assets/product-jacket-1.jpg";
import productJacket2 from "@/assets/product-jacket-2.jpg";
import productJacket3 from "@/assets/product-jacket-3.jpg";
import productJacket4 from "@/assets/product-jacket-4.jpg";
import productJacket5 from "@/assets/product-jacket-5.jpg";
import productJacket6 from "@/assets/product-jacket-6.jpg";
import productJacket7 from "@/assets/product-jacket-7.jpg";
import productSet1 from "@/assets/product-set-1.jpg";
import productSet2 from "@/assets/product-set-2.jpg";
import productSet3 from "@/assets/product-set-3.jpg";
import productSet4 from "@/assets/product-set-4.jpg";
import productSet5 from "@/assets/product-set-5.jpg";
import productSet6 from "@/assets/product-set-6.jpg";
import productShirt1 from "@/assets/product-shirt-1.jpg";
import productShirt2 from "@/assets/product-shirt-2.jpg";
import productShirt3 from "@/assets/product-shirt-3.jpg";
import productShirt4 from "@/assets/product-shirt-4.jpg";
import productShirt5 from "@/assets/product-shirt-5.jpg";
import productShirt6 from "@/assets/product-shirt-6.jpg";

export type ProductCategory = "hoodies" | "tshirts" | "sweatshirts" | "jackets" | "streetwear-sets" | "shirts" | "new-arrivals";

export interface Product {
  id: string;
  productId: string;
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
  bgColor?: string;
}

const defaultColors = [
  { name: "Black", hex: "#222" },
  { name: "Charcoal", hex: "#444" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Maroon", hex: "#5a0a0a" },
  { name: "Forest Green", hex: "#1a3a1a" },
  { name: "Slate Grey", hex: "#666" },
  { name: "Coffee", hex: "#3c1e0e" },
];

const teeColors = [
  { name: "Black", hex: "#222" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Charcoal", hex: "#444" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Maroon", hex: "#5a0a0a" },
  { name: "Sand", hex: "#c2a878" },
];

const jacketColors = [
  { name: "Black", hex: "#222" },
  { name: "Charcoal", hex: "#444" },
  { name: "Navy", hex: "#0d1b3e" },
  { name: "Olive", hex: "#3a3a1a" },
  { name: "Burgundy", hex: "#5c1a2a" },
  { name: "Graphite", hex: "#3a3a3a" },
  { name: "Storm Grey", hex: "#5a5a5a" },
];

const setColors = [
  { name: "Black", hex: "#222" },
  { name: "Charcoal", hex: "#444" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Mocha", hex: "#3e2a1a" },
  { name: "Ash Grey", hex: "#7a7a7a" },
  { name: "Sand", hex: "#c2a878" },
];

const shirtColors = [
  { name: "White", hex: "#f5f5f5" },
  { name: "Sky Blue", hex: "#5b9bd5" },
  { name: "Black", hex: "#222" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "Light Grey", hex: "#aaa" },
  { name: "Beige", hex: "#d4c5a9" },
  { name: "Pink", hex: "#d4a0a0" },
];

export const products: Product[] = [
  // ── Hoodies ──
  {
    id: "1", productId: "MG-001", name: "Classic Black Hoodie", price: 3499, image: productHoodie1, category: "hoodies", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "80% Cotton, 20% Polyester — Heavyweight 350 GSM, Stitched in Pakistan",
    description: "Oversized streetwear hoodie with premium fleece lining. Ribbed cuffs and hem for a snug fit. Kangaroo pocket and adjustable drawstring hood.",
    rating: 4.8, reviews: 124,
  },
  {
    id: "2", productId: "MG-002", name: "Neon Edge Hoodie", price: 3999, image: productHoodie2, category: "hoodies", badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#222" }, { name: "Dark Green", hex: "#1a3a1a" }, { name: "Navy", hex: "#1a1a3e" }, { name: "Burgundy", hex: "#5c1a2a" }, { name: "Storm Grey", hex: "#5a5a5a" }, { name: "Midnight Blue", hex: "#0d1b3e" }, { name: "Olive", hex: "#3a3a1a" }],
    material: "100% French Terry Cotton — 320 GSM, Stitched in Pakistan",
    description: "Bold neon accent stitching on a matte black base. Drop shoulders with a boxy fit. Double-layered hood for extra warmth.",
    rating: 4.9, reviews: 87,
  },
  {
    id: "3", productId: "MG-003", name: "Charcoal Oversized Hoodie", price: 4499, image: productHoodie3, category: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#444" }, { name: "Slate", hex: "#666" }, { name: "Black", hex: "#222" }, { name: "Ash Grey", hex: "#7a7a7a" }, { name: "Mocha", hex: "#3e2a1a" }, { name: "Deep Navy", hex: "#0f1a3a" }, { name: "Graphite", hex: "#3a3a3a" }],
    material: "100% Organic Cotton — 380 GSM, Premium Stitched in Pakistan",
    description: "Ultra-premium oversized hoodie with a relaxed silhouette. Side seam pockets and elongated sleeves. Washed finish for a vintage streetwear look.",
    rating: 4.7, reviews: 56,
  },
  {
    id: "7", productId: "MG-007", name: "Phantom Zip-Up Hoodie", price: 3999, image: productHoodie4, category: "hoodies",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "85% Cotton, 15% Polyester — 340 GSM, Stitched in Pakistan",
    description: "Full-zip hoodie with a clean phantom black finish. Metal YKK zipper and split kangaroo pockets. Tapered fit with ribbed waistband.",
    rating: 4.7, reviews: 68,
  },
  {
    id: "8", productId: "MG-008", name: "Midnight Velour Hoodie", price: 4499, image: productHoodie5, category: "hoodies", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "Velour Cotton Blend — 360 GSM, Stitched in Pakistan",
    description: "Luxurious velour texture with a matte midnight finish. Oversized silhouette with dropped shoulders. Embossed MG logo on chest.",
    rating: 4.8, reviews: 45,
  },
  {
    id: "9", productId: "MG-009", name: "Arctic Fleece Hoodie", price: 4299, image: productHoodie6, category: "hoodies",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% Heavy Fleece Cotton — 400 GSM, Stitched in Pakistan",
    description: "Heavyweight fleece-lined hoodie built for cold weather. Double-stitched seams with reinforced hood. Ultra-warm without the bulk.",
    rating: 4.6, reviews: 92,
  },
  {
    id: "10", productId: "MG-010", name: "Shadow Pullover Hoodie", price: 3699, image: productHoodie7, category: "hoodies",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "80% Cotton, 20% Polyester — 330 GSM, Stitched in Pakistan",
    description: "Minimalist pullover with tonal shadow branding. Relaxed boxy fit with elongated sleeves. Perfect layering piece for urban fits.",
    rating: 4.5, reviews: 73,
  },
  // ── T-Shirts ──
  {
    id: "4", productId: "MG-004", name: "Stealth Black Tee", price: 1499, image: productTee1, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Combed Cotton — 180 GSM, Stitched in Pakistan",
    description: "Clean minimal tee with a relaxed fit. Pre-shrunk fabric with reinforced collar. Perfect base layer for any streetwear look.",
    rating: 4.6, reviews: 203,
  },
  {
    id: "5", productId: "MG-005", name: "Urban Graphic Tee", price: 1699, image: productTee2, category: "tshirts", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#222" }, { name: "Off White", hex: "#eee" }, { name: "Grey", hex: "#999" }, { name: "Navy", hex: "#1a1a3e" }, { name: "Rust", hex: "#8b3a1a" }, { name: "Sage", hex: "#6b7a5e" }, { name: "Cream", hex: "#e8d8c0" }],
    material: "100% Ring-Spun Cotton — 200 GSM, DTG Printed in Pakistan",
    description: "Premium graphic tee with exclusive MG Brands artwork. Soft hand-feel print that lasts. Slightly oversized fit for modern streetwear styling.",
    rating: 4.9, reviews: 312,
  },
  {
    id: "6", productId: "MG-006", name: "Olive Street Tee", price: 1599, image: productTee3, category: "tshirts", badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Olive", hex: "#556B2F" }, { name: "Black", hex: "#222" }, { name: "Tan", hex: "#a68a64" }, { name: "Forest Green", hex: "#2a4a2a" }, { name: "Charcoal", hex: "#444" }, { name: "Clay", hex: "#8b6b4a" }, { name: "Stone", hex: "#7a7a6e" }],
    material: "100% Cotton — 190 GSM, Garment Dyed in Pakistan",
    description: "Earthy olive tone with a washed finish for a vintage feel. Reinforced shoulders and taped neck seam. Pairs perfectly with cargo pants or joggers.",
    rating: 4.5, reviews: 98,
  },
  {
    id: "11", productId: "MG-011", name: "Concrete Jungle Tee", price: 1799, image: productTee4, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Combed Cotton — 200 GSM, Screen Printed in Pakistan",
    description: "Urban-inspired graphic with concrete texture print. Dropped shoulders with a boxy cut. Pre-washed for instant softness.",
    rating: 4.7, reviews: 156,
  },
  {
    id: "12", productId: "MG-012", name: "Noir Essential Tee", price: 1499, image: productTee5, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Pima Cotton — 180 GSM, Stitched in Pakistan",
    description: "The perfect black tee redefined. Pima cotton for ultimate softness. Slightly elongated hem for a modern streetwear silhouette.",
    rating: 4.8, reviews: 241,
  },
  {
    id: "13", productId: "MG-013", name: "Washed Slate Tee", price: 1699, image: productTee6, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Cotton — 190 GSM, Acid Washed in Pakistan",
    description: "Acid-washed slate grey for a vintage distressed look. Reinforced collar and shoulder seams. Oversized relaxed fit.",
    rating: 4.4, reviews: 89,
  },
  {
    id: "14", productId: "MG-014", name: "Midnight Stripe Tee", price: 1899, image: productTee8, category: "tshirts", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Ring-Spun Cotton — 210 GSM, Yarn-Dyed in Pakistan",
    description: "Subtle tonal stripe pattern on a dark base. Yarn-dyed for lasting color depth. Tailored boxy fit with raw hem finish.",
    rating: 4.6, reviews: 67,
  },
  {
    id: "15", productId: "MG-015", name: "Graffiti Tag Tee", price: 1999, image: productTee7, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Cotton — 200 GSM, DTG Printed in Pakistan",
    description: "Exclusive graffiti-style MG Brands artwork. High-definition DTG print that won't crack or fade. Oversized streetwear fit.",
    rating: 4.9, reviews: 178,
  },
  {
    id: "16", productId: "MG-016", name: "Raw Edge Longline Tee", price: 1799, image: productTee4, category: "tshirts",
    sizes: ["S", "M", "L", "XL"], colors: teeColors,
    material: "100% Organic Cotton — 190 GSM, Stitched in Pakistan",
    description: "Elongated longline tee with raw-cut hem. Curved bottom for layered styling. Organic cotton for eco-conscious streetwear.",
    rating: 4.5, reviews: 104,
  },
  // ── Sweatshirts ──
  {
    id: "17", productId: "MG-017", name: "Oversized Crew Sweatshirt", price: 3299, image: productSweat1, category: "sweatshirts", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "80% Cotton, 20% Polyester — 320 GSM, Stitched in Pakistan",
    description: "Classic crew neck sweatshirt with an oversized fit. Brushed fleece interior for warmth. Ribbed cuffs and waistband.",
    rating: 4.8, reviews: 145,
  },
  {
    id: "18", productId: "MG-018", name: "Vintage Wash Sweatshirt", price: 3499, image: productSweat2, category: "sweatshirts",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% French Terry Cotton — 300 GSM, Garment Dyed in Pakistan",
    description: "Sun-faded vintage wash for a worn-in aesthetic. Relaxed drop-shoulder fit. Subtle embroidered MG logo on chest.",
    rating: 4.7, reviews: 98,
  },
  {
    id: "19", productId: "MG-019", name: "Tech Fleece Crewneck", price: 3799, image: productSweat3, category: "sweatshirts", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "Cotton-Poly Tech Fleece — 340 GSM, Stitched in Pakistan",
    description: "Engineered tech fleece with moisture-wicking properties. Articulated sleeves for mobility. Modern athletic silhouette.",
    rating: 4.6, reviews: 72,
  },
  {
    id: "20", productId: "MG-020", name: "Distressed Edge Sweatshirt", price: 3599, image: productSweat4, category: "sweatshirts",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% Cotton — 310 GSM, Distressed in Pakistan",
    description: "Intentionally distressed edges and raw hems. Heavy cotton construction with a boxy silhouette. Washed for a broken-in feel.",
    rating: 4.5, reviews: 64,
  },
  {
    id: "21", productId: "MG-021", name: "Colorblock Crew Sweatshirt", price: 3399, image: productSweat5, category: "sweatshirts",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "80% Cotton, 20% Polyester — 320 GSM, Stitched in Pakistan",
    description: "Tonal colorblock panels with contrast stitching. Dropped shoulders with a relaxed crew neck. Premium brushed interior.",
    rating: 4.4, reviews: 53,
  },
  {
    id: "22", productId: "MG-022", name: "Embossed Logo Sweatshirt", price: 3699, image: productSweat6, category: "sweatshirts", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% Organic Cotton — 350 GSM, Stitched in Pakistan",
    description: "3D embossed MG Brands logo on the chest. Heavyweight organic cotton with a structured fit. Luxury streetwear essential.",
    rating: 4.9, reviews: 112,
  },
  {
    id: "36", productId: "MG-036", name: "Essential Crewneck Sweatshirt", price: 2999, image: productSweat7, category: "sweatshirts",
    sizes: ["S", "M", "L", "XL"], colors: defaultColors,
    material: "100% Loopback Cotton — 300 GSM, Stitched in Pakistan",
    description: "Everyday essential crewneck in premium loopback cotton. Classic fit with ribbed trims. Minimal branding for versatile styling.",
    rating: 4.6, reviews: 167,
  },
  // ── Jackets ──
  {
    id: "23", productId: "MG-023", name: "Urban Bomber Jacket", price: 4999, image: productJacket1, category: "jackets", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "Nylon Shell, Polyester Lining — Stitched in Pakistan",
    description: "Classic bomber silhouette with ribbed collar, cuffs, and hem. Satin-finish nylon shell with quilted lining. Two side pockets and interior pocket.",
    rating: 4.8, reviews: 89,
  },
  {
    id: "24", productId: "MG-024", name: "Stealth Windbreaker", price: 4499, image: productJacket2, category: "jackets", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "100% Ripstop Nylon — Water-Resistant, Stitched in Pakistan",
    description: "Lightweight water-resistant windbreaker with packable hood. Half-zip front with bungee-cord hem. Reflective MG logo for night visibility.",
    rating: 4.7, reviews: 67,
  },
  {
    id: "25", productId: "MG-025", name: "Cargo Utility Jacket", price: 4799, image: productJacket3, category: "jackets",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "Cotton Canvas — Heavy Duty, Stitched in Pakistan",
    description: "Military-inspired utility jacket with multiple cargo pockets. Heavy-duty cotton canvas construction. Adjustable waist tabs for a customized fit.",
    rating: 4.6, reviews: 54,
  },
  {
    id: "26", productId: "MG-026", name: "Puffer Street Jacket", price: 4999, image: productJacket4, category: "jackets", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "Nylon Shell, Synthetic Fill — Stitched in Pakistan",
    description: "Lightweight puffer jacket with synthetic insulation. Stand-up collar with concealed hood. Clean streetwear lines with a cropped fit.",
    rating: 4.9, reviews: 76,
  },
  {
    id: "27", productId: "MG-027", name: "Denim Trucker Jacket", price: 4599, image: productJacket5, category: "jackets",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "100% Denim Cotton — 12oz, Stitched in Pakistan",
    description: "Classic trucker jacket in heavyweight denim. Vintage-washed with subtle distressing. Button-front with dual chest pockets.",
    rating: 4.5, reviews: 48,
  },
  {
    id: "28", productId: "MG-028", name: "Tech Shell Jacket", price: 4699, image: productJacket6, category: "jackets",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "3-Layer Technical Fabric — Waterproof, Stitched in Pakistan",
    description: "Performance shell jacket with sealed seams. Waterproof breathable fabric for all conditions. Minimalist design with hidden zip pockets.",
    rating: 4.7, reviews: 61,
  },
  {
    id: "35", productId: "MG-035", name: "Distressed Denim Jacket", price: 4899, image: productJacket7, category: "jackets",
    sizes: ["S", "M", "L", "XL"], colors: jacketColors,
    material: "100% Raw Denim — 14oz, Stitched in Pakistan",
    description: "Raw selvedge denim jacket with natural wear-in potential. Heavy 14oz construction that molds to your body. MG Brands leather patch on back.",
    rating: 4.6, reviews: 37,
  },
  // ── Streetwear Sets ──
  {
    id: "29", productId: "MG-029", name: "Shadow Tracksuit Set", price: 4999, image: productSet1, category: "streetwear-sets", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "80% Cotton, 20% Polyester — 320 GSM, Stitched in Pakistan",
    description: "Matching hoodie and jogger set in shadow black. Brushed fleece interior with tapered jogger fit. Coordinated for effortless streetwear styling.",
    rating: 4.9, reviews: 134,
  },
  {
    id: "30", productId: "MG-030", name: "Velour Lounge Set", price: 4799, image: productSet2, category: "streetwear-sets", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "Velour Cotton Blend — 300 GSM, Stitched in Pakistan",
    description: "Luxurious velour zip-up jacket and matching pants. Soft-touch fabric with a premium sheen. Relaxed fit for comfort and style.",
    rating: 4.8, reviews: 87,
  },
  {
    id: "31", productId: "MG-031", name: "Tech Fleece Combo", price: 4999, image: productSet3, category: "streetwear-sets",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "Cotton-Poly Tech Fleece — 340 GSM, Stitched in Pakistan",
    description: "Performance tech fleece crewneck with matching joggers. Engineered for warmth without weight. Tapered leg with zip ankle cuffs.",
    rating: 4.7, reviews: 92,
  },
  {
    id: "32", productId: "MG-032", name: "Cargo Duo Set", price: 4899, image: productSet4, category: "streetwear-sets", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "100% Cotton — 280 GSM, Stitched in Pakistan",
    description: "Oversized tee paired with matching cargo joggers. Utility pockets on the joggers for a functional look. Washed finish for vintage vibes.",
    rating: 4.6, reviews: 65,
  },
  {
    id: "33", productId: "MG-033", name: "Monochrome Zip Set", price: 4699, image: productSet5, category: "streetwear-sets",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "French Terry Cotton — 310 GSM, Stitched in Pakistan",
    description: "Full-zip hoodie with matching straight-leg pants. Monochrome tonal design with embossed branding. Clean lines and premium construction.",
    rating: 4.5, reviews: 58,
  },
  {
    id: "34", productId: "MG-034", name: "Urban Runner Set", price: 4599, image: productSet6, category: "streetwear-sets",
    sizes: ["S", "M", "L", "XL"], colors: setColors,
    material: "Moisture-Wicking Poly Blend — 260 GSM, Stitched in Pakistan",
    description: "Lightweight half-zip top with slim joggers. Quick-dry fabric ideal for active streetwear. Reflective accents for night visibility.",
    rating: 4.4, reviews: 43,
  },
  // ── Shirts ──
  {
    id: "37", productId: "MG-037", name: "Premium Oxford Shirt", price: 2999, image: productShirt1, category: "shirts", badge: "New",
    sizes: ["S", "M", "L", "XL"], colors: shirtColors,
    material: "100% Premium Oxford Cotton — 140 GSM, Stitched in Pakistan",
    description: "Classic Oxford button-down with a modern slim fit. Reinforced collar and pearl buttons. Perfect for smart-casual streetwear layering.",
    rating: 4.7, reviews: 82,
  },
  {
    id: "38", productId: "MG-038", name: "Urban Linen Shirt", price: 3299, image: productShirt2, category: "shirts",
    sizes: ["S", "M", "L", "XL"], colors: shirtColors,
    material: "Cotton-Linen Blend — 120 GSM, Stitched in Pakistan",
    description: "Lightweight linen-blend shirt with a relaxed oversized cut. Camp collar for a laid-back summer vibe. Breathable and easy to style.",
    rating: 4.6, reviews: 64,
  },
  {
    id: "39", productId: "MG-039", name: "Midnight Satin Shirt", price: 3499, image: productShirt3, category: "shirts", badge: "Premium",
    sizes: ["S", "M", "L", "XL"], colors: shirtColors,
    material: "Satin Polyester Blend — Stitched in Pakistan",
    description: "Sleek satin-finish shirt for evening streetwear looks. Subtle sheen with a tailored relaxed fit. Hidden button placket for a clean front.",
    rating: 4.8, reviews: 53,
  },
  {
    id: "40", productId: "MG-040", name: "Flannel Check Shirt", price: 2799, image: productShirt4, category: "shirts",
    sizes: ["S", "M", "L", "XL"], colors: shirtColors,
    material: "100% Brushed Cotton Flannel — 170 GSM, Stitched in Pakistan",
    description: "Soft brushed flannel with a subtle tonal check pattern. Oversized fit perfect for layering over tees. Warm and comfortable all-season shirt.",
    rating: 4.5, reviews: 97,
  },
  {
    id: "41", productId: "MG-041", name: "Corduroy Overshirt", price: 3699, image: productShirt5, category: "shirts", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"], colors: shirtColors,
    material: "100% Cotton Corduroy — 250 GSM, Stitched in Pakistan",
    description: "Heavy corduroy overshirt with snap buttons. Works as a light jacket or standalone shirt. Chest pockets with flap closures.",
    rating: 4.9, reviews: 118,
  },
  {
    id: "42", productId: "MG-042", name: "Twill Utility Shirt", price: 2899, image: productShirt6, category: "shirts",
    sizes: ["S", "M", "L", "XL"], colors: shirtColors,
    material: "Cotton Twill — 160 GSM, Stitched in Pakistan",
    description: "Military-inspired utility shirt with dual chest pockets. Durable twill weave with a structured fit. Roll-up sleeve tabs for versatility.",
    rating: 4.6, reviews: 75,
  },
];
