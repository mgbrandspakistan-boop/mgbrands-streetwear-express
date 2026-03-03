import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/923271497570?text=Assalamualaikum%20MG%20Brands!%20I%20want%20to%20place%20an%20order."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_hsl(142,70%,45%/0.5)] transition-all duration-300"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
