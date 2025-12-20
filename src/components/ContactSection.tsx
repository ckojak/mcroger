import { useState } from "react";
import { MessageCircle, Mail, Phone, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const whatsappNumber = "5521982223787";
  const whatsappMessage = encodeURIComponent(
    "Olá! Tenho interesse em contratar o MC Roger para um evento."
  );

  return (
    <section id="contato" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface-darker" />
      
      {/* Red glow effects */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blood/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-60 h-60 bg-blood-light/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-gothic text-4xl md:text-5xl font-bold mb-4 text-gradient-blood">
            CONTRATE
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Entre em contato para shows e eventos
          </p>
          <div className="w-24 h-1 bg-gradient-blood mx-auto mt-6 rounded-full" />
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-gothic text-2xl font-bold mb-6 text-foreground">
                Fale Conosco
              </h3>
              
              <div className="space-y-4">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-[#25D366]/50 transition-all group hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground font-body">WhatsApp</p>
                    <p className="text-muted-foreground font-body">(21) 98222-3787</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-blood/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blood-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground font-body">Telefone</p>
                    <p className="text-muted-foreground font-body">(21) 98222-3787</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
                  <div className="w-12 h-12 rounded-full bg-blood/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blood-light" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground font-body">E-mail</p>
                    <p className="text-muted-foreground font-body">contato@mcroger.com.br</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main CTA */}
            <Button
              variant="whatsapp"
              size="xl"
              className="w-full"
              asChild
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                Contratar via WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Contact Form */}
          <div className="p-8 bg-card rounded-2xl border border-border/50">
            <h3 className="font-gothic text-2xl font-bold mb-6 text-foreground">
              Envie uma Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-surface-dark border-border focus:border-blood-light"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-surface-dark border-border focus:border-blood-light"
                />
              </div>
              
              <div>
                <Input
                  type="tel"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-surface-dark border-border focus:border-blood-light"
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Detalhes do evento (data, local, tipo de evento...)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-surface-dark border-border focus:border-blood-light resize-none"
                />
              </div>
              
              <Button
                type="submit"
                variant="blood"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
