import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Music, Play, ExternalLink } from "lucide-react";

interface Release {
  id: string;
  title: string;
  cover_url: string | null;
  spotify_link: string | null;
  youtube_link: string | null;
  release_date: string | null;
}

const ReleasesSection = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReleases = useCallback(async () => {
    const { data, error } = await supabase
      .from("releases")
      .select("*")
      .eq("is_active", true)
      .order("release_date", { ascending: false })
      .limit(6);

    if (!error && data) {
      setReleases(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  if (loading) {
    return (
      <section className="py-12 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Carregando...</div>
        </div>
      </section>
    );
  }

  if (releases.length === 0) {
    return null;
  }

  return (
    <section id="lancamentos" className="py-12 relative">
      <div className="absolute inset-0 bg-surface-dark" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-gothic text-3xl md:text-4xl font-bold mb-2 text-gradient-blood">
            LANÇAMENTOS RECENTES
          </h2>
          <p className="text-muted-foreground font-body text-sm">
            Últimos singles e colaborações
          </p>
          <div className="w-16 h-1 bg-gradient-blood mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {releases.map((release) => (
            <div
              key={release.id}
              className="group bg-card rounded-lg border border-border/50 overflow-hidden hover:border-blood-light/50 transition-all"
            >
              <div className="aspect-square relative overflow-hidden">
                {release.cover_url ? (
                  <img
                    src={release.cover_url}
                    alt={release.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-dark flex items-center justify-center">
                    <Music className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {release.spotify_link && (
                    <a
                      href={release.spotify_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Music className="w-4 h-4 text-black" />
                    </a>
                  )}
                  {release.youtube_link && (
                    <a
                      href={release.youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Play className="w-4 h-4 text-white" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-2">
                <h3 className="font-gothic text-xs font-bold truncate">{release.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReleasesSection;
