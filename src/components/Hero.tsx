import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBanner} alt="MG Brands Pakistan - Premium Streetwear" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4"
          >
            Premium Streetwear Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl text-foreground leading-[0.9] mb-6"
          >
            Elevate Your
            <br />
            <span className="text-gradient-neon">Street Style</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg sm:text-xl mb-8 max-w-md"
          >
            Premium Quality Hoodies & Shirts — Made for Pakistan
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#shop" className="bg-primary text-primary-foreground px-8 py-4 font-body font-semibold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_hsl(110_100%_55%/0.4)] transition-all duration-300 rounded-sm">
              Shop Now
            </a>
            <a href="#shop" className="border border-foreground/30 text-foreground px-8 py-4 font-body font-semibold text-sm tracking-wider uppercase hover:border-primary hover:text-primary transition-all duration-300 rounded-sm">
              View Collection
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
