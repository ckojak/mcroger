import { Instagram, Youtube, Music, Clock } from "lucide-react";
import { useEffect, useState } from "react";

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
          <div className="flex items-center gap-4">
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
              href="https://youtube.com/@mcrogertv"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
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
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm font-body">
              © {currentYear} MC Roger. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
