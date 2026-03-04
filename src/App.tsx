import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import Hoodies from "./pages/Hoodies";
import TShirts from "./pages/TShirts";
import Sweatshirts from "./pages/Sweatshirts";
import Jackets from "./pages/Jackets";
import StreetWearSets from "./pages/StreetWearSets";
import Shirts from "./pages/Shirts";
import CustomTShirtDesigns from "./pages/CustomTShirtDesigns";
import CustomMugPrint from "./pages/CustomMugPrint";
import CustomStamps from "./pages/CustomStamps";
import AllCategories from "./pages/AllCategories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/hoodies" element={<Hoodies />} />
            <Route path="/t-shirts" element={<TShirts />} />
            <Route path="/sweatshirts" element={<Sweatshirts />} />
            <Route path="/jackets" element={<Jackets />} />
            <Route path="/streetwear-sets" element={<StreetWearSets />} />
            <Route path="/shirts" element={<Shirts />} />
            <Route path="/custom-shirts" element={<CustomTShirtDesigns />} />
            <Route path="/custom-tshirt-designs" element={<CustomTShirtDesigns />} />
            <Route path="/custom-mug-print" element={<CustomMugPrint />} />
            <Route path="/custom-stamps" element={<CustomStamps />} />
            <Route path="/all-categories" element={<AllCategories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
