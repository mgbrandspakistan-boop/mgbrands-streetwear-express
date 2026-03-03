import CategoryPage from "@/components/CategoryPage";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Shirts = () => (
  <>
    <CategoryPage category="shirts" title="Shirts Collection" description="Premium ready-made shirts with bold designs and quality fabrics. Upgrade your wardrobe with MG Brands Pakistan." />
    <CartDrawer />
    <WhatsAppButton />
  </>
);

export default Shirts;
