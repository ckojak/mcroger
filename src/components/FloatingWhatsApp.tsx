import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const whatsappNumber = "5521982223787";
  const whatsappMessage = encodeURIComponent(
    "Olá! Tenho interesse em contratar o MC Roger para um evento."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contato via WhatsApp"
    >
      {/* Pulse ring */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25" />
      
      {/* Button */}
      <div className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
        <MessageCircle className="w-8 h-8 text-white" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-card px-4 py-2 rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        <span className="text-sm font-body text-foreground">Contratar agora!</span>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-card border-r border-t border-border rotate-45" />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
