import { Instagram, Youtube, Music } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative border-t border-border/50">
      <div className="absolute inset-0 bg-surface-darker" />
      
      <div className="relative z-10 container mx-auto px-4">
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
              href="https://instagram.com/mcroger"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
            </a>
            
            <a
              href="https://youtube.com/@mcroger"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center hover:border-blood-light/50 hover:bg-blood/20 transition-all group"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-blood-light transition-colors" />
            </a>
            
            <a
              href="https://open.spotify.com/artist/1bAftSH8umNcGZ0uyV7LMg"
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
