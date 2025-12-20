import React from 'react';

const SpotifySection: React.FC = () => {
  return (
    <div className="spotify-section">
      <h2>Spotify</h2>
      <iframe
        src="https://open.spotify.com/embed/artist/6QiUH0jJVJUdnte0jX1Wzj?utm_source=generator&theme=0"
        width="100%"
        height="500"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default SpotifySection;