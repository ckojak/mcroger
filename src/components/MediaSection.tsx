import { useState, useCallback, useMemo } from "react";
import { Camera, Video, FileImage, FileText, X, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// --- IMPORTAÇÃO DAS IMAGENS (Direto da pasta assets) ---
import foto1 from '../assets/foto1.jpg';
import foto2 from '../assets/foto2.jpg';
import foto3 from '../assets/foto3.jpg';
import foto4 from '../assets/foto4.jpg';
import foto5 from '../assets/foto5.jpg';
import foto6 from '../assets/foto6.jpg';

// --- FUNÇÃO AUXILIAR PARA EXTRAIR ID DO YOUTUBE ---
// Isso permite que você cole o link completo e ele funcione automaticamente
const getYouTubeId = (url: string) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
};

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

// --- ARRAY ATUALIZADO ---
const photoGallery = [
  foto1,
  foto2,
  foto3,
  foto4,
  foto5,
  foto6
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
      
      case "videos": {
        // --- AQUI ESTÁ A MÁGICA: COLE SEUS LINKS COMPLETOS AQUI ---
        const videosList = [
          { 
            url: "https://youtu.be/78QVCTj7PJg?si=PJjUp5uG_ebv3T3_", // Vídeo Grande
            title: "Vídeo Destaque" 
          },
          { 
            url: "https://youtu.be/HJrp6VtgGSE?si=w3uJW5WCQbbSlZ0B", // Quadrado 1
            title: "Vídeo 01" 
          },
          { 
            url: "https://youtu.be/UTYNURBuv7o?si=MvLgEw-Wx53GT5dP", // Quadrado 2
            title: "Vídeo 02" 
          },
          { 
            url: "https://youtu.be/1nSogoq89bU?si=_YCSSB4PCDxp3Hn6", // Quadrado 3
            title: "Vídeo 03" 
          },
        ];

        // Pega o ID do primeiro vídeo para usar no iframe
        const mainVideoId = getYouTubeId(videosList[0].url);

        return (
          <div className="space-y-6">
            <div className="aspect-video bg-surface-dark rounded-lg flex items-center justify-center border border-border">
              <iframe
                width="100%"
                height="100%"
                // A função converte o link completo para o link de embed automaticamente
                src={`https://www.youtube.com/embed/${mainVideoId}`} 
                title="MC Roger Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {videosList.slice(1).map((video, index) => {
                const videoId = getYouTubeId(video.url);
                return (
                  <a
                    key={index}
                    href={video.url} // Usa o link completo para abrir no YouTube
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-video bg-surface-dark rounded-lg overflow-hidden cursor-pointer border border-border/50 hover:border-blood-light/50 transition-all block"
                  >
                    {/* Capa automática */}
                    <img 
                      src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-blood-light/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-xs font-bold text-white shadow-black drop-shadow-md truncate">
                      {video.title}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        );
      }
      
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
    <section id="midia" className="py-12 relative">
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
