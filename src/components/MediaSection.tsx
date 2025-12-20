import { useState } from "react";
import { Camera, Video, FileImage, FileText, X, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface MediaCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  type: "photos" | "videos" | "logos" | "rider";
  driveLink: string;
}

const mediaCards: MediaCard[] = [
  {
    id: "photos",
    title: "FOTOS",
    icon: <Camera className="w-10 h-10" />,
    description: "Fotos em alta resolução para divulgação",
    type: "photos",
    driveLink: "https://drive.google.com/drive/u/0/mobile/folders/1otv3BEwuUu8lYU4sUsBaqCdxCxOpBond",
  },
  {
    id: "videos",
    title: "VÍDEOS",
    icon: <Video className="w-10 h-10" />,
    description: "Clipes, apresentações e bastidores",
    type: "videos",
    driveLink: "https://drive.google.com/drive/u/0/mobile/folders/128hkN0_VTcLUhI8lwrUq6bxxRCGdS4yJ",
  },
  {
    id: "logos",
    title: "LOGOS",
    icon: <FileImage className="w-10 h-10" />,
    description: "Arquivos vetoriais e PNG",
    type: "logos",
    driveLink: "https://drive.google.com/drive/u/0/mobile/folders/1564cllDHDGUQF4sNMl67WNsehGsux59e",
  },
  {
    id: "rider",
    title: "RIDER TÉCNICO",
    icon: <FileText className="w-10 h-10" />,
    description: "Mapa de palco e especificações",
    type: "rider",
    driveLink: "https://drive.google.com/drive/u/0/mobile/folders/1NjKRbpihW_jzJKvempMQtV3EqWCpFdAV",
  },
];

// Placeholder images for gallery (replace with actual URLs)
const photoGallery = [
  "foto",
  "foto",
  "https://scontent.cdninstagram.com/v/t51.75761-15/471304253_18480494068054706_142411895120448294_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzUzMDMzNTE4OTc2MTExNTQzMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=Cq27pxdh8wQQ7kNvwFhbV8W&_nc_oc=AdkVzoVHpKKf-pnz1Se4VLl2bredwITmox1frdR3tFTKuJvPFNsR69FlVm4AMHxKg2c&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=bNLYnpJZCJDQlSUsqTihDQ&oh=00_AflyTnGd90T7VnEK5h3dHlsaAwQFmh9RIEZUy1cecnxQww&oe=694CAACB",
  "foto",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
];

const MediaSection = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaCard | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const renderModalContent = () => {
    if (!selectedMedia) return null;

    switch (selectedMedia.type) {
      case "photos":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photoGallery.map((photo, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer border border-border/50 hover:border-blood-light/50 transition-all"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="blood" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case "videos":
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-surface-dark rounded-lg flex items-center justify-center border border-border">
              <iframe
                width="100%"
                height="100%"
                src="https://youtube.com/@mcrogertv?si=W_77VkJC-KwSP3VL"
                title="MC Roger Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group relative aspect-video bg-surface-dark rounded-lg overflow-hidden cursor-pointer border border-border/50 hover:border-blood-light/50 transition-all"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blood-light/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 text-sm text-muted-foreground font-body">
                    Vídeo {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "logos":
        return (
          <div className="grid grid-cols-2 gap-6">
            {["PNG Colorido", "PNG Branco", "Vetor SVG", "Vetor AI"].map((format) => (
              <div
                key={format}
                className="group p-8 bg-surface-dark rounded-xl border border-border/50 hover:border-blood-light/50 transition-all text-center"
              >
                <FileImage className="w-16 h-16 text-blood-light mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-gothic text-lg mb-2">{format}</h4>
                <Button variant="bloodOutline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        );
      
      case "rider":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-surface-dark rounded-xl border border-border/50">
                <FileText className="w-12 h-12 text-blood-light mb-4" />
                <h4 className="font-gothic text-xl mb-2">Rider Técnico</h4>
                <p className="text-muted-foreground text-sm mb-4 font-body">
                  Especificações técnicas completas para o show
                </p>
                <Button variant="blood" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              
              <div className="p-6 bg-surface-dark rounded-xl border border-border/50">
                <FileText className="w-12 h-12 text-blood-light mb-4" />
                <h4 className="font-gothic text-xl mb-2">Mapa de Palco</h4>
                <p className="text-muted-foreground text-sm mb-4 font-body">
                  Layout e posicionamento do palco
                </p>
                <Button variant="blood" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            <div className="p-6 bg-surface-dark rounded-xl border border-border/50 text-center">
              <p className="text-muted-foreground font-body mb-4">
                Precisa de informações adicionais?
              </p>
              <Button variant="bloodOutline" asChild>
                <a href="https://wa.me/5521982223787" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Falar com Produção
                </a>
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="midia" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-dark to-background" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-gothic text-4xl md:text-5xl font-bold mb-4 text-gradient-blood">
            CENTRAL DE DOWNLOADS
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Acesse fotos, vídeos, logos e documentos técnicos para divulgação
          </p>
          <div className="w-24 h-1 bg-gradient-blood mx-auto mt-6 rounded-full" />
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {mediaCards.map((card) => (
            <div key={card.id} className="flex flex-col">
              <button
                onClick={() => setSelectedMedia(card)}
                className="group relative p-8 bg-card rounded-2xl border border-border/50 hover:border-blood-light/50 transition-all duration-500 hover:shadow-blood hover:-translate-y-2 text-left flex-1"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blood/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="text-blood-light mb-4 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-gothic text-xl font-bold mb-2 text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body">
                    {card.description}
                  </p>
                </div>
              </button>
              
              {/* Link completo */}
              <a
                href={card.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-blood-light transition-colors py-2"
              >
                <ExternalLink className="w-3 h-3" />
                Link completo
              </a>
            </div>
          ))}
        </div>
      </div>
      
      {/* Media Modal */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-gothic text-2xl text-gradient-blood flex items-center gap-3">
              {selectedMedia?.icon}
              {selectedMedia?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {renderModalContent()}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Photo Lightbox */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <DialogClose className="absolute top-4 right-4 z-50 p-2 bg-background/80 rounded-full hover:bg-background">
            <X className="w-6 h-6" />
          </DialogClose>
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto}
                alt="Foto em alta resolução"
                className="w-full h-auto rounded-lg"
              />
              <Button
                variant="blood"
                className="absolute bottom-4 right-4"
                asChild
              >
                <a href={selectedPhoto} download target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Download HD
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MediaSection;
