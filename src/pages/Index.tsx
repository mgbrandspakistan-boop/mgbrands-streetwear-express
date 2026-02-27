import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import BestSelling from "@/components/BestSelling";
import WhyChooseMG from "@/components/WhyChooseMG";
import CustomerReviews from "@/components/CustomerReviews";
import AboutBrand from "@/components/AboutBrand";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyNav from "@/components/StickyNav";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Hero />
      <FeaturedCategories />
      <BestSelling />
      <WhyChooseMG />
      <CustomerReviews />
      <AboutBrand />
      <SiteFooter />
      <WhatsAppButton />
      <StickyNav />
    </>
  );
};

export default Index;
