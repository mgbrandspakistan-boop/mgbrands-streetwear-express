import { motion } from "framer-motion";

const AboutBrand = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-body">Our Story</p>
          <h2 className="font-display text-4xl sm:text-6xl text-foreground mb-8">
            Built for the <span className="text-gradient-neon">Bold</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            MG Brands Pakistan is built for the bold generation who want premium fashion without premium prices. 
            We believe every young Pakistani deserves to wear clothes that make them feel confident, stylish, and unstoppable.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            From the streets of Lahore to every corner of Pakistan, we deliver quality streetwear that stands out. 
            Our mission is simple — make you look good, feel good, and pay less.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBrand;
