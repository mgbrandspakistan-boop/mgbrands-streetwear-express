import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

const reviews = [
  { name: "Ahmed R.", city: "Lahore", text: "Best hoodie quality I've found in Pakistan. Fabric is super soft and fits perfectly!", rating: 5 },
  { name: "Bilal K.", city: "Karachi", text: "Ordered two tees, both arrived in great condition. The printing quality is top notch.", rating: 5 },
  { name: "Hassan M.", city: "Islamabad", text: "MG Brands never disappoints. Been ordering since day one. Premium stuff at affordable rates.", rating: 5 },
  { name: "Zain A.", city: "Rawalpindi", text: "The neon hoodie is 🔥. Got so many compliments. Definitely ordering more!", rating: 5 },
  { name: "Usman S.", city: "Faisalabad", text: "Fast delivery and amazing customer service. The quality speaks for itself.", rating: 4 },
];

const CustomerReviews = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl sm:text-5xl text-center text-foreground mb-12"
      >
        What Our <span className="text-gradient-neon">Customers</span> Say
      </motion.h2>

      <div className="relative max-w-2xl mx-auto">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="bg-card border border-border rounded-sm p-8 text-center"
        >
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: reviews[active].rating }).map((_, i) => (
              <Star key={i} size={20} className="fill-primary text-primary" />
            ))}
          </div>
          <p className="text-foreground text-lg mb-6 italic">"{reviews[active].text}"</p>
          <p className="font-display text-xl text-primary">{reviews[active].name}</p>
          <p className="text-muted-foreground text-sm">{reviews[active].city}</p>
        </motion.div>

        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === active ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
