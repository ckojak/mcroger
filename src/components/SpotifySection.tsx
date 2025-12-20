import React from 'react';
import { Music } from 'lucide-react';

interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
}

const SpotifySection: React.FC = () => {
  const artistId = '6QiUH0jJVJUdnte0jX1Wzj';
  
  const topSongs: SpotifyTrack[] = [
    { id: '1', title: 'Tô na Brasília com o Zigão', artist: 'Artist' },
    { id: '2', title: 'Trilogia 150', artist: 'Artist' },
    { id: '3', title: 'Sem Sentimento', artist: 'Artist' },
    { id: '4', title: 'Bandida', artist: 'Artist' },
    { id: '5', title: 'Melhores Amigos', artist: 'Artist' }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Music className="w-8 h-8 text-green-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Top Songs</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {topSongs.map((song) => (
            <div
              key={song.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-full h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-md mb-3">
                <Music className="w-12 h-12 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm truncate">
                {song.title}
              </h3>
              <p className="text-gray-600 text-xs mt-1">Spotify Artist</p>
              <a
                href={`https://open.spotify.com/artist/${artistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
              >
                Listen on Spotify
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotifySection;
