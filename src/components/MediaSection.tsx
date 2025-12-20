import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface MediaCard {
  title: string;
  description: string;
  driveLink: string;
  icon: string;
}

const MediaSection: React.FC = () => {
  const mediaCards: MediaCard[] = [
    {
      title: 'FOTOS',
      description: 'Acesso a todas as fotos de eventos e conteúdo',
      driveLink: 'https://drive.google.com/drive/u/0/mobile/folders/1otv3BEwuUu8lYU4sUsBaqCdxCxOpBond',
      icon: '📷'
    },
    {
      title: 'VÍDEOS',
      description: 'Biblioteca de vídeos e conteúdo multimídia',
      driveLink: 'https://drive.google.com/drive/u/0/mobile/folders/128hkN0_VTcLUhI8lwrUq6bxxRCGdS4yJ',
      icon: '🎥'
    },
    {
      title: 'LOGOS',
      description: 'Arquivos de logos e identidade visual',
      driveLink: 'https://drive.google.com/drive/u/0/mobile/folders/1564cllDHDGUQF4sNMl67WNsehGsux59e',
      icon: '🎨'
    },
    {
      title: 'RIDER TÉCNICO',
      description: 'Documentação técnica e especificações',
      driveLink: 'https://drive.google.com/drive/u/0/mobile/folders/1NjKRbpihW_jzJKvempMQtV3EqWCpFdAV',
      icon: '📋'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Mídia</h2>
        <p className="text-center text-gray-600 mb-12">
          Acesse nossos recursos de mídia e documentação
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaCards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <a
                    href={card.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Acessar <ExternalLink size={16} />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;