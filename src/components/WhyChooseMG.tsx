import { motion } from "framer-motion";
import { Shield, Truck, BadgeDollarSign, CreditCard } from "lucide-react";

const features = [
  { icon: Shield, title: "Premium Fabric", desc: "High-quality materials that last" },
  { icon: Truck, title: "Fast Delivery", desc: "Nationwide delivery across Pakistan" },
  { icon: BadgeDollarSign, title: "Affordable Prices", desc: "Premium fashion, fair prices" },
  { icon: CreditCard, title: "Advance Delivery Charges", desc: "Pay delivery charges upfront, COD for product" },
];

const WhyChooseMG = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl text-center text-foreground mb-12"
        >
          Why Choose <span className="text-gradient-neon">MG Brands</span>
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-sm bg-card border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <f.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMG;
