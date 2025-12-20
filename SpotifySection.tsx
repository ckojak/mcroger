// Replace the old Spotify artist ID with the new one in the iframe src URL
// Old ID: 1bAftSH8umNcGZ0uyV7LMg
// New ID: 6QiUH0jJVJUdnte0jX1Wzj

import React from 'react';

export const SpotifySection: React.FC = () => {
  return (
    <div className="spotify-section">
      <iframe
        style={{
          borderRadius: '12px',
        }}
        src="https://open.spotify.com/embed/artist/6QiUH0jJVJUdnte0jX1Wzj?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};