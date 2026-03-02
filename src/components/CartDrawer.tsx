import { useState } from "react";
import { X, Plus, Minus, Trash2, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const paymentMethods = [
  { id: "bank", label: "Faysal Bank", detail: "3333475000006343" },
  { id: "easypaisa", label: "Easypaisa", detail: "03701727488" },
  { id: "jazzcash", label: "JazzCash", detail: "03291497570" },
  { id: "payoneer", label: "Payoneer", detail: "Muhammad Nabeel Naeem" },
];

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl text-foreground">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center mt-12">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-secondary/50 p-3 rounded-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-sm" />
                      <div className="flex-1">
                        <h4 className="text-foreground font-medium text-sm">{item.name}</h4>
                        <p className="text-primary font-bold text-sm">PKR {item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-muted p-1 rounded-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="text-foreground text-sm w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-muted p-1 rounded-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Plus size={14} />
                          </button>
                          <button onClick={() => removeItem(item.id)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Payment Method Section */}
                  {showPayment && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border border-border rounded-sm overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard size={16} className="text-primary" />
                          <p className="text-sm font-semibold text-foreground">Select Payment Method</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Account Name: <span className="text-foreground font-medium">Muhammad Nabeel Naeem</span></p>

                        <div className="space-y-2">
                          {paymentMethods.map((pm) => (
                            <button
                              key={pm.id}
                              onClick={() => setSelectedPayment(pm.id)}
                              className={`w-full text-left p-3 rounded-sm border transition-all duration-200 ${
                                selectedPayment === pm.id
                                  ? "border-primary bg-primary/10"
                                  : "border-border bg-secondary/30 hover:border-muted-foreground"
                              }`}
                            >
                              <p className="text-sm font-medium text-foreground">{pm.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 font-mono">{pm.detail}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">Total</span>
                  <span className="text-primary font-bold text-lg">PKR {totalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => setShowPayment(!showPayment)}
                  className="w-full flex items-center justify-center gap-2 border border-border text-foreground py-2.5 rounded-sm text-sm font-medium hover:bg-secondary/50 transition-colors"
                >
                  <CreditCard size={16} />
                  Payment Methods
                  {showPayment ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                <button
                  onClick={() => { setIsCartOpen(false); navigate("/checkout"); }}
                  className="w-full bg-primary text-primary-foreground py-3 font-body font-semibold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_hsl(110_100%_55%/0.4)] transition-all duration-300 rounded-sm"
                >
                  Checkout — COD Available
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
