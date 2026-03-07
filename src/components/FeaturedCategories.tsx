import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catTshirts from "@/assets/cat-tshirts.jpg";
import customTshirtDesign1 from "@/assets/custom-tshirt-design-1.jpg";
import customMug1 from "@/assets/custom-mug-1.jpg";
import customStamp1 from "@/assets/custom-stamp-1.jpg";
import walletLeather from "@/assets/wallet-leather.jpg";
import watchClassic from "@/assets/watch-classic.jpg";
import shoeSneakers from "@/assets/shoe-sneakers.jpg";

const categories = [
  { name: "Hoodies", image: catHoodies, path: "/hoodies" },
  { name: "T-Shirts", image: catTshirts, path: "/t-shirts" },
  { name: "Custom T-Shirts", image: customTshirtDesign1, path: "/custom-tshirt-designs" },
  { name: "Custom Mug Print", image: customMug1, path: "/custom-mug-print" },
  { name: "Custom Stamps", image: customStamp1, path: "/custom-stamps" },
  { name: "Custom Wallet", image: walletLeather, path: "/custom-wallet-design" },
  { name: "Watches", image: watchClassic, path: "/watches" },
  { name: "Shoes", image: shoeSneakers, path: "/shoes" },
];

const FeaturedCategories = () => {
  return (
    <section className="section-padding max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl sm:text-5xl text-center text-foreground mb-12"
      >
        Shop By <span className="text-gradient-neon">Category</span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={cat.path}
              className="relative group aspect-[3/4] overflow-hidden rounded-sm cursor-pointer block"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-background/60 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 text-center px-2">
                  {cat.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
