import CategoryPage from "@/components/CategoryPage";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Watches = () => (
  <>
    <CategoryPage category="watches" title="Watches Collection" description="Premium watches for every style. From classic analog to modern smart watches, find your perfect timepiece at MG Brands Pakistan." />
    <CartDrawer />
    <WhatsAppButton />
  </>
);

export default Watches;
