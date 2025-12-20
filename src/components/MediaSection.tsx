import React from 'react';
import { FolderOpen } from 'lucide-react';

interface MediaCard {
  title: string;
  driveLink: string;
}

const MediaSection: React.FC = () => {
  const mediaCards: MediaCard[] = [
    {
      title: 'Photos',
      driveLink: 'https://drive.google.com/drive/folders/1-KvXH4gZ8X9xZ8X9xZ8X9xZ8X9xZ8X9x',
    },
    {
      title: 'Videos',
      driveLink: 'https://drive.google.com/drive/folders/1-KvXH4gZ8X9xZ8X9xZ8X9xZ8X9xZ8X9x',
    },
    {
      title: 'Logos',
      driveLink: 'https://drive.google.com/drive/folders/1-KvXH4gZ8X9xZ8X9xZ8X9xZ8X9xZ8X9x',
    },
    {
      title: 'Rider',
      driveLink: 'https://drive.google.com/drive/folders/1-KvXH4gZ8X9xZ8X9xZ8X9xZ8X9xZ8X9x',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Media Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaCards.map((card, index) => (
            <a
              key={index}
              href={card.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center min-h-48 hover:bg-gray-50"
            >
              <FolderOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 text-center">{card.title}</h3>
              <p className="text-sm text-gray-500 mt-2">Click to access</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;