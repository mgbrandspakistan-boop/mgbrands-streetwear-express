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
}

export const products: Product[] = [
  { id: "1", name: "Classic Black Hoodie", price: 3499, image: productHoodie1, category: "hoodies", badge: "Best Seller" },
  { id: "2", name: "Neon Edge Hoodie", price: 3999, image: productHoodie2, category: "hoodies", badge: "New" },
  { id: "3", name: "Charcoal Oversized Hoodie", price: 4499, image: productHoodie3, category: "hoodies" },
  { id: "4", name: "Stealth Black Tee", price: 1499, image: productTee1, category: "tshirts" },
  { id: "5", name: "Urban Graphic Tee", price: 1699, image: productTee2, category: "tshirts", badge: "Best Seller" },
  { id: "6", name: "Olive Street Tee", price: 1599, image: productTee3, category: "tshirts", badge: "New" },
];
