
import React from 'react';
import { DownloadIcon } from './icons';

interface EmojiCardProps {
  src: string;
  index: number;
}

export const EmojiCard: React.FC<EmojiCardProps> = ({ src, index }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${src}`;
    link.download = `character-emoji-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative aspect-square bg-slate-800 rounded-lg p-3 transition-all duration-300 hover:bg-slate-700 hover:scale-105 shadow-md">
      <img
        src={`data:image/png;base64,${src}`}
        alt={`Generated Emoji ${index + 1}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />
      <button
        onClick={handleDownload}
        className="absolute bottom-2 right-2 bg-cyan-500/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label="Download Emoji"
      >
        <DownloadIcon />
      </button>
    </div>
  );
};
