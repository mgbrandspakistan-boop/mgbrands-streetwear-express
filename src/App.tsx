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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
