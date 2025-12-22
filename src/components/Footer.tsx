import { Instagram, Youtube, Music, Clock, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

// Componentes de ícone personalizados para manter o estilo do Lucide
// (O Lucide padrão não tem TikTok e SoundCloud nativos)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SoundCloudIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 18v-6a2 2 0 0 1 2-2 1 1 0 0 0 1-1v-1a4 4 0 0 1 4-4h.5a3.5 3.5 0 0 1 3.5 3.5v.5" />
    <path d="M16 18h2a4 4 0 0 0 0-8h-1" />
    <path d="M2 18h1.5" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [times, setTimes] = useState({
    rio: "",
    newYork: "",
    dubai: ""
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      
      const rioTime = now.toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit"
      });
      
      const nyTime = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit"
      });
      
      const dubaiTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit"
      });
      
      setTimes({
        rio: rioTime,
        newYork: nyTime,
        dubai: dubaiTime
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 relative border-t border-border/50">
      <div className="absolute inset-0 bg-surface-darker" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Timezone Section */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-8 pb-8 border-b border-border/30">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-blood-light" />
            <span className="text-muted-foreground">Rio de Janeiro:</span>
            <span className="font-mono text-foreground font-semibold">{times.rio}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-blood-light" />
            <span className="text-muted-foreground">New York:</span>
            <span className="font-mono text-foreground font-semibold">{times.newYork}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-blood-light" />
            <span className="text-muted-foreground">Dubai:</span>
            <span className="font-mono text-foreground font-semibold">{times.dubai}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <h3 className="font-gothic text-2xl font-bold text-gradient-blood">
              MC ROGER
            </h3>
            <p className="text-muted-foreground text-sm font-body mt-1">
              Bruxo • Presskit 2026
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
            <a
              href="https://instagram.com/mcrogeroficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
            </a>
            
            <a
              href="https://twitter.com/mcrogeroficial" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
            </a>

            <a
              href="https://tiktok.com/@mcrogeroficial" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
            </a>

            <a
              href="https://youtube.com/@mcrogertv"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
            </a>

            <a
              href="https://soundcloud.com/mcrogeroficial" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="SoundCloud"
            >
              <SoundCloudIcon className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
            </a>
            
            <a
              href="https://open.spotify.com/artist/6QiUH0jJVJUdnte0jX1Wzj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="Spotify"
            >
              <Music className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-muted-foreground text-sm font-body">
              © {currentYear} MC Roger. Todos os direitos reservados.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-4">
              <VisitCounter />
              <Link to="/auth" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blood-light transition-colors">
                <Lock className="w-3 h-3" />
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
