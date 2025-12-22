import { Music, Mic2, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-12 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-dark to-background" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section title */}
          <h2 className="font-gothic text-4xl md:text-5xl font-bold mb-6 text-gradient-blood animate-fade-up">
            CONHEÇA MAIS O MC ROGER
          </h2>
          
          <div className="w-24 h-1 bg-gradient-blood mx-auto mb-12 rounded-full" />
          
          {/* Bio text */}
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-body animate-fade-up delay-200">
            <p>
              É dono de vários hits pelo Brasil: <span className="text-blood-light font-semibold">Sem Sentimento</span>, 
              <span className="text-blood-light font-semibold"> Trilogia 150</span>, 
              <span className="text-blood-light font-semibold"> Tudo no Sigilo</span>, 
              <span className="text-blood-light font-semibold"> Porque se Foi Irmão</span>, entre vários outros sucessos 
              somando mais de <span className="text-foreground font-bold">600 milhões de reproduções</span> nas plataformas digitais.
            </p>
            
            <p>
              Performance <span className="text-blood-light font-semibold">explosiva e contagiante</span>, 
              fazendo com que todos cantem e dancem do início ao fim, 
              trazendo assim uma experiência única e marcante para seu público.
            </p>
          </div>
          
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="group p-6 bg-card rounded-xl border border-border/50 hover:border-blood-light/50 transition-all duration-300 hover:shadow-blood">
              <Music className="w-12 h-12 text-blood-light mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-gothic text-xl font-bold mb-2 text-foreground">+600M</h3>
              <p className="text-muted-foreground font-body">Reproduções nas plataformas</p>
            </div>
            
            <div className="group p-6 bg-card rounded-xl border border-border/50 hover:border-blood-light/50 transition-all duration-300 hover:shadow-blood">
              <Mic2 className="w-12 h-12 text-blood-light mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-gothic text-xl font-bold mb-2 text-foreground">Hits Nacionais</h3>
              <p className="text-muted-foreground font-body">Sucessos em todo Brasil</p>
            </div>
            
            <div className="group p-6 bg-card rounded-xl border border-border/50 hover:border-blood-light/50 transition-all duration-300 hover:shadow-blood">
              <Users className="w-12 h-12 text-blood-light mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-gothic text-xl font-bold mb-2 text-foreground">Performance</h3>
              <p className="text-muted-foreground font-body">Explosiva e contagiante</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
