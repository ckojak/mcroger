import React from 'react';

const MediaSection: React.FC = () => {
  const mediaLinks = {
    FOTOS: 'https://drive.google.com/drive/u/0/mobile/folders/1otv3BEwuUu8lYU4sUsBaqCdxCxOpBond',
    VÍDEOS: 'https://drive.google.com/drive/u/0/mobile/folders/128hkN0_VTcLUhI8lwrUq6bxxRCGdS4yJ',
    LOGOS: 'https://drive.google.com/drive/u/0/mobile/folders/1564cllDHDGUQF4sNMl67WNsehGsux59e',
    RIDER: 'https://drive.google.com/drive/u/0/mobile/folders/1NjKRbpihW_jzJKvempMQtV3EqWCpFdAV',
  };

  return (
    <div className="media-section">
      <h2>Media Links</h2>
      <div className="media-links">
        {Object.entries(mediaLinks).map(([name, url]) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="media-link"
          >
            {name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MediaSection;