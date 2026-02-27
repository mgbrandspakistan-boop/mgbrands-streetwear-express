import { motion } from "framer-motion";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catTshirts from "@/assets/cat-tshirts.jpg";
import catNewArrivals from "@/assets/cat-new-arrivals.jpg";

const categories = [
  { name: "Hoodies", image: catHoodies },
  { name: "T-Shirts", image: catTshirts },
  { name: "New Arrivals", image: catNewArrivals },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.name}
            href="#shop"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative group aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/40 group-hover:bg-background/60 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-display text-3xl sm:text-4xl text-foreground group-hover:text-primary transition-colors duration-300">
                {cat.name}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
