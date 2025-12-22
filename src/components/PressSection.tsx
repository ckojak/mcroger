import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Newspaper } from "lucide-react";

interface PressArticle {
  id: string;
  title: string;
  source: string;
  link: string;
  image_url: string | null;
  published_at: string | null;
}

const PressSection = () => {
  const [articles, setArticles] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    const { data, error } = await supabase
      .from("press_articles")
      .select("*")
      .eq("is_active", true)
      .order("published_at", { ascending: false })
      .limit(6);

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (loading) {
    return (
      <section className="py-12 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Carregando...</div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section id="materias" className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface-dark" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-gothic text-3xl md:text-4xl font-bold mb-2 text-gradient-blood">
            NA MÍDIA
          </h2>
          <p className="text-muted-foreground font-body text-sm">
            Matérias e reportagens sobre MC Roger
          </p>
          <div className="w-16 h-1 bg-gradient-blood mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-lg border border-border/50 hover:border-blood-light/50 transition-all overflow-hidden"
            >
              {article.image_url ? (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-surface-dark flex items-center justify-center">
                  <Newspaper className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <div className="p-4">
                <p className="text-xs text-blood-light mb-1 font-medium">{article.source}</p>
                <h3 className="font-gothic text-sm font-bold line-clamp-2 group-hover:text-blood-light transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <ExternalLink className="w-3 h-3" />
                  Ler matéria
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
