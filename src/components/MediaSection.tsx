import React from 'react';

interface MediaLink {
  title: string;
  url: string;
  icon: string;
}

const MediaSection: React.FC = () => {
  const mediaLinks: MediaLink[] = [
    {
      title: 'FOTOS',
      url: 'https://drive.google.com/drive/u/0/mobile/folders/1otv3BEwuUu8lYU4sUsBaqCdxCxOpBond',
      icon: '📷',
    },
    {
      title: 'VÍDEOS',
      url: 'https://drive.google.com/drive/u/0/mobile/folders/128hkN0_VTcLUhI8lwrUq6bxxRCGdS4yJ',
      icon: '🎥',
    },
    {
      title: 'LOGOS',
      url: 'https://drive.google.com/drive/u/0/mobile/folders/1564cllDHDGUQF4sNMl67WNsehGsux59e',
      icon: '🎨',
    },
    {
      title: 'RIDER',
      url: 'https://drive.google.com/drive/u/0/mobile/folders/1NjKRbpihW_jzJKvempMQtV3EqWCpFdAV',
      icon: '🚴',
    },
  ];

  return (
    <section className="media-section">
      <h2>Mídia</h2>
      <div className="media-links">
        {mediaLinks.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="media-link"
          >
            <span className="icon">{link.icon}</span>
            <span className="title">{link.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MediaSection;
