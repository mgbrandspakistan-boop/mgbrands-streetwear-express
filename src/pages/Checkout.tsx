import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, CreditCard } from "lucide-react";

const paymentAccounts = {
  bank: { label: "Faysal Bank", detail: "3333475000006343" },
  easypaisa: { label: "Easypaisa", detail: "03701727488" },
  jazzcash: { label: "JazzCash", detail: "03291497570" },
  payoneer: { label: "Payoneer", detail: "nabeelnaeem@email.com" },
};

type PaymentMethod = "cod" | "bank" | "easypaisa" | "jazzcash" | "payoneer";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const deliveryCharge = 200;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderLines = items.map(
      (item) => `• ${item.name} × ${item.quantity} = PKR ${(item.price * item.quantity).toLocaleString()}`
    );
    const message = [
      `🛒 *New Order — MG Brands Pakistan*`,
      ``,
      `*Customer:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*City:* ${form.city}`,
      `*Address:* ${form.address}`,
      ``,
      `*Order Items:*`,
      ...orderLines,
      ``,
      `*Subtotal:* PKR ${totalPrice.toLocaleString()}`,
      `*Delivery:* PKR ${deliveryCharge}`,
      `*Total:* PKR ${(totalPrice + deliveryCharge).toLocaleString()}`,
      ``,
      `*Payment:* ${paymentMethod === "cod" ? "Cash on Delivery" : paymentAccounts[paymentMethod as keyof typeof paymentAccounts].label}`,
    ].join("\n");

    const waUrl = `https://wa.me/923291497570?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");

    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="text-primary mx-auto mb-6" />
          <h1 className="font-display text-4xl text-foreground mb-4">Order Placed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order! We'll contact you on WhatsApp to confirm.
          </p>
          <button onClick={() => navigate("/")} className="bg-primary text-primary-foreground px-8 py-3 font-body font-semibold text-sm uppercase tracking-wider rounded-sm">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Cart is Empty</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">Go back to shop</button>
        </div>
      </div>
    );
  }

  const selectedAccount = paymentMethod !== "cod" ? paymentAccounts[paymentMethod] : null;

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Shop
        </button>

        <h1 className="font-display text-4xl text-foreground mb-8">Checkout</h1>

        <div className="bg-card border border-border rounded-sm p-6 mb-6">
          <h3 className="font-display text-xl text-foreground mb-4">Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
              <span className="text-foreground">{item.name} × {item.quantity}</span>
              <span className="text-muted-foreground">PKR {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm py-2 border-b border-border">
            <span className="text-foreground">Delivery Charges</span>
            <span className="text-muted-foreground">PKR {deliveryCharge}</span>
          </div>
          <div className="flex justify-between py-3 font-bold">
            <span className="text-foreground">Total</span>
            <span className="text-primary">PKR {(totalPrice + deliveryCharge).toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-card border border-border rounded-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={18} className="text-primary" />
            <h3 className="font-display text-xl text-foreground">Payment Method</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {([
              { id: "cod", label: "Cash on Delivery" },
              { id: "bank", label: "Faysal Bank" },
              { id: "easypaisa", label: "Easypaisa" },
              { id: "jazzcash", label: "JazzCash" },
              { id: "payoneer", label: "Payoneer" },
            ] as { id: PaymentMethod; label: string }[]).map((pm) => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setPaymentMethod(pm.id)}
                className={`p-3 rounded-sm border text-sm font-medium transition-all duration-200 ${
                  paymentMethod === pm.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {pm.label}
              </button>
            ))}
          </div>

          {/* Show account details immediately when non-COD is selected */}
          {selectedAccount && (
            <div className="mt-4 p-4 border border-primary/30 bg-primary/5 rounded-sm">
              <p className="text-sm text-muted-foreground mb-1">Account Name</p>
              <p className="text-foreground font-semibold mb-3">Muhammad Nabeel Naeem</p>
              <p className="text-sm text-muted-foreground mb-1">{selectedAccount.label}</p>
              <p className="text-foreground font-mono font-semibold text-lg">{selectedAccount.detail}</p>
              <p className="text-xs text-muted-foreground mt-3">Please send payment and share screenshot on WhatsApp after placing order.</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-sm p-6 space-y-4">
          <h3 className="font-display text-xl text-foreground mb-2">Delivery Details</h3>

          {(["name", "phone", "city", "address"] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm text-muted-foreground mb-1 capitalize">{field === "phone" ? "Phone / WhatsApp" : field}</label>
              <input
                required
                value={form[field]}
                onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder={field === "phone" ? "03XX XXXXXXX" : `Enter your ${field}`}
              />
            </div>
          ))}

          <button type="submit" className="w-full bg-primary text-primary-foreground py-4 font-body font-semibold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_hsl(110_100%_55%/0.4)] transition-all duration-300 rounded-sm mt-4">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
