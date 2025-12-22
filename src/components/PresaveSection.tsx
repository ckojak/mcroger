import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Music, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Presave {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  presave_link: string;
  release_date: string | null;
}

const PresaveSection = () => {
  const [presaves, setPresaves] = useState<Presave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPresaves();
  }, []);

  const fetchPresaves = async () => {
    const { data, error } = await supabase
      .from("presaves")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error && data) {
      setPresaves(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-12 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Carregando...</div>
        </div>
      </section>
    );
  }

  if (presaves.length === 0) {
    return null;
  }

  return (
    <section id="presave" className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark to-background" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-gothic text-3xl md:text-4xl font-bold mb-2 text-gradient-blood">
            PRE-SAVE
          </h2>
          <p className="text-muted-foreground font-body text-sm">
            Salve antes do lançamento oficial
          </p>
          <div className="w-16 h-1 bg-gradient-blood mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {presaves.map((presave) => (
            <div
              key={presave.id}
              className="bg-card rounded-xl border border-border/50 overflow-hidden hover:border-blood-light/50 transition-all group"
            >
              {presave.cover_url ? (
                <div className="aspect-square overflow-hidden">
                  <img
                    src={presave.cover_url}
                    alt={presave.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-surface-dark flex items-center justify-center">
                  <Music className="w-16 h-16 text-blood-light" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-gothic font-bold text-lg">{presave.title}</h3>
                {presave.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {presave.description}
                  </p>
                )}
                {presave.release_date && (
                  <p className="text-xs text-blood-light mt-2">
                    Lançamento: {format(new Date(presave.release_date), "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                )}
                <Button variant="blood" className="w-full mt-4" asChild>
                  <a href={presave.presave_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Fazer Pre-Save
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PresaveSection;
