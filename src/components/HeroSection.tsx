import { ChevronDown } from "lucide-react";
import { memo } from "react";
import heroImage from "@/assets/mc-roger-portrait.jpg";
import bgTexture from "@/assets/dark-texture-bg.jpg";

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgTexture})` }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      
      {/* Red glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blood/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blood-light/10 rounded-full blur-[100px] animate-pulse delay-500" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-up">
          {/* Artist Image */}
          <div className="relative mx-auto mb-8 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blood to-blood-light blur-xl opacity-50 animate-pulse-glow" />
            <img
              src={heroImage}
              alt="MC Roger - Bruxo"
              className="relative w-full h-full object-cover rounded-full border-4 border-blood-light/50 shadow-2xl"
            />
          </div>
          
          {/* Name */}
          <h1 className="font-gothic text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 glow-red">
            <span className="text-gradient-blood">MC ROGER</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl font-body tracking-widest uppercase mb-2">
            Bruxo
          </p>
          
          {/* Presskit badge */}
          <div className="inline-block mt-6 px-6 py-2 border border-blood-light/30 rounded-full">
            <span className="font-gothic text-xl md:text-2xl tracking-[0.3em] text-blood-light">
              PRESSKIT 2026
            </span>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
          aria-label="Scroll para baixo"
        >
          <ChevronDown className="w-10 h-10 text-blood-light group-hover:text-foreground transition-colors" />
        </button>
      </div>
    </section>
  );
};

export default memo(HeroSection);
