const SpotifySection = () => {
  return (
    <section id="musica" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-darker" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blood-light/30 to-transparent" />
      
      {/* Red glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blood/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-gothic text-4xl md:text-5xl font-bold mb-4 text-gradient-blood">
            OUÇA AGORA
          </h2>
          <p className="text-muted-foreground font-body">
            Os maiores sucessos do MC Roger
          </p>
          <div className="w-24 h-1 bg-gradient-blood mx-auto mt-6 rounded-full" />
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Spotify Embed */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border/50">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/artist/6QiUH0jJVJUdnte0jX1Wzj?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player - MC Roger"
            />
          </div>
          
          {/* Top Hits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              "Sem Sentimento",
              "Trilogia 150",
              "Tudo no Sigilo",
              "Porque se Foi Irmão",
            ].map((song, index) => (
              <div
                key={index}
                className="group p-4 bg-card rounded-xl border border-border/50 hover:border-blood-light/50 transition-all duration-300 hover:shadow-blood text-center"
              >
                <div className="text-3xl font-gothic text-blood-light mb-2">
                  #{index + 1}
                </div>
                <p className="text-sm font-body text-foreground">{song}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifySection;