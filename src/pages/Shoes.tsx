import CategoryPage from "@/components/CategoryPage";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Shoes = () => (
  <>
    <CategoryPage category="shoes" title="Shoes Collection" description="Step up your style with premium footwear. From casual loafers to sports shoes, find the perfect pair at MG Brands Pakistan." />
    <CartDrawer />
    <WhatsAppButton />
  </>
);

export default Shoes;
