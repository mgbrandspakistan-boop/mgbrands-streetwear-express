import productHoodie1 from "@/assets/product-hoodie-1.jpg";
import productHoodie2 from "@/assets/product-hoodie-2.jpg";
import productHoodie3 from "@/assets/product-hoodie-3.jpg";
import productTee1 from "@/assets/product-tee-1.jpg";
import productTee2 from "@/assets/product-tee-2.jpg";
import productTee3 from "@/assets/product-tee-3.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "hoodies" | "tshirts" | "new-arrivals";
  badge?: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  material: string;
  description: string;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1", name: "Classic Black Hoodie", price: 3499, image: productHoodie1, category: "hoodies", badge: "Best Seller",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#111" }, { name: "Charcoal", hex: "#333" }, { name: "Navy", hex: "#1a1a3e" }, { name: "Maroon", hex: "#5a0a0a" }, { name: "Forest Green", hex: "#1a3a1a" }, { name: "Slate Grey", hex: "#555" }, { name: "Coffee", hex: "#3c1e0e" }],
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
    sizes: ["M", "L", "XL", "XXL"],
    colors: [{ name: "Charcoal", hex: "#333" }, { name: "Slate", hex: "#555" }, { name: "Black", hex: "#111" }, { name: "Ash Grey", hex: "#6e6e6e" }, { name: "Mocha", hex: "#3e2a1a" }, { name: "Deep Navy", hex: "#0f1a3a" }, { name: "Graphite", hex: "#2a2a2a" }],
    material: "100% Organic Cotton — 380 GSM, Premium Stitched in Pakistan",
    description: "Ultra-premium oversized hoodie with a relaxed silhouette. Side seam pockets and elongated sleeves. Washed finish for a vintage streetwear look.",
    rating: 4.7, reviews: 56,
  },
  {
    id: "4", name: "Stealth Black Tee", price: 1499, image: productTee1, category: "tshirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#111" }, { name: "White", hex: "#f5f5f5" }, { name: "Charcoal", hex: "#333" }, { name: "Navy", hex: "#1a1a3e" }, { name: "Olive", hex: "#556B2F" }, { name: "Maroon", hex: "#5a0a0a" }, { name: "Sand", hex: "#c2a878" }],
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Olive", hex: "#556B2F" }, { name: "Black", hex: "#111" }, { name: "Tan", hex: "#a68a64" }, { name: "Forest Green", hex: "#2a4a2a" }, { name: "Charcoal", hex: "#333" }, { name: "Clay", hex: "#8b6b4a" }, { name: "Stone", hex: "#7a7a6e" }],
    material: "100% Cotton — 190 GSM, Garment Dyed in Pakistan",
    description: "Earthy olive tone with a washed finish for a vintage feel. Reinforced shoulders and taped neck seam. Pairs perfectly with cargo pants or joggers.",
    rating: 4.5, reviews: 98,
  },
];
