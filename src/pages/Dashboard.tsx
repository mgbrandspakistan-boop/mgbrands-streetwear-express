import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, User, Package, MapPin, Phone, Mail, Edit2, Save, X, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  status: string;
  payment_method: string;
  total_price: number;
  delivery_charges: number;
  customer_name: string | null;
  customer_phone: string | null;
  customer_city: string | null;
  customer_address: string | null;
  created_at: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  image_url: string | null;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  processing: "bg-blue-500/20 text-blue-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-primary/20 text-primary",
  completed: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive",
};

const Dashboard = () => {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: "", phone: "", city: "", shipping_address: "" });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderFilter, setOrderFilter] = useState("all");

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [loading, user]);

  useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        city: profile.city || "",
        shipping_address: profile.shipping_address || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    if (ordersData) {
      const ordersWithItems: Order[] = [];
      for (const order of ordersData) {
        const { data: items } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", order.id);
        ordersWithItems.push({ ...order, items: items || [] });
      }
      setOrders(ordersWithItems);
    }
    setOrdersLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update(editForm).eq("user_id", user.id);
    if (error) {
      toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
    } else {
      toast({ title: "Profile Updated!" });
      setEditing(false);
      refreshProfile();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const filteredOrders = orderFilter === "all" ? orders : orders.filter((o) => o.status === orderFilter);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={18} /> Back to Shop
          </button>
          <button onClick={handleSignOut} className="text-sm text-destructive hover:underline">Sign Out</button>
        </div>

        <h1 className="font-display text-4xl text-foreground mb-2">My Account</h1>
        <p className="text-muted-foreground mb-8">Welcome back, {profile?.full_name || user?.email}</p>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-secondary/50 p-1 rounded-sm">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-sm transition-all ${activeTab === "profile" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <User size={16} className="inline mr-2" />Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-sm transition-all ${activeTab === "orders" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Package size={16} className="inline mr-2" />My Orders
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-card border border-border rounded-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-foreground">Account Information</h2>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-primary text-sm hover:underline">
                  <Edit2 size={14} /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSaveProfile} className="flex items-center gap-1 text-primary text-sm hover:underline"><Save size={14} /> Save</button>
                  <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-muted-foreground text-sm hover:underline"><X size={14} /> Cancel</button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {[
                { icon: User, label: "Full Name", key: "full_name" as const, value: profile?.full_name },
                { icon: Mail, label: "Email", key: null, value: profile?.email || user?.email },
                { icon: Phone, label: "Phone", key: "phone" as const, value: profile?.phone },
                { icon: MapPin, label: "City", key: "city" as const, value: profile?.city },
                { icon: MapPin, label: "Shipping Address", key: "shipping_address" as const, value: profile?.shipping_address },
              ].map((field) => (
                <div key={field.label} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                  <field.icon size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{field.label}</p>
                    {editing && field.key ? (
                      <input
                        value={editForm[field.key]}
                        onChange={(e) => setEditForm((p) => ({ ...p, [field.key!]: e.target.value }))}
                        className="w-full bg-secondary border border-border rounded-sm px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <p className="text-foreground text-sm">{field.value || "Not set"}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            {/* Order Status Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {["all", "pending", "processing", "shipped", "delivered", "completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setOrderFilter(s)}
                  className={`px-4 py-2 text-xs font-medium rounded-sm whitespace-nowrap transition-all ${orderFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  {s === "all" ? "All Orders" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {ordersLoading ? (
              <p className="text-muted-foreground text-center py-12">Loading orders...</p>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-card border border-border rounded-sm p-12 text-center">
                <Package size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-medium">No orders found</p>
                <p className="text-muted-foreground text-sm mt-1">Your orders will appear here after you place them.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="w-full bg-card border border-border rounded-sm p-4 text-left hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground font-mono">#{order.id.slice(0, 8)}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-sm ${statusColors[order.status] || ""}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-foreground text-sm font-medium">{order.items.length} item(s)</p>
                        <p className="text-muted-foreground text-xs">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">PKR {Number(order.total_price).toLocaleString()}</span>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedOrder(null)}>
            <div className="bg-card border border-border rounded-sm p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl text-foreground">Order Details</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="text-foreground font-mono">#{selectedOrder.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground">{new Date(selectedOrder.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-sm ${statusColors[selectedOrder.status] || ""}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="text-foreground">{selectedOrder.payment_method}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <p className="text-sm font-medium text-foreground mb-3">Items</p>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-foreground">{item.product_name}</p>
                      <p className="text-muted-foreground text-xs">{item.product_id} × {item.quantity}</p>
                    </div>
                    <span className="text-muted-foreground">PKR {(Number(item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-muted-foreground">PKR {Number(selectedOrder.delivery_charges).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">PKR {(Number(selectedOrder.total_price) + Number(selectedOrder.delivery_charges)).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
