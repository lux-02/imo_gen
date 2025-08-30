
import React from 'react';
import { EmojiCard } from './EmojiCard';

interface EmojiGridProps {
  emojis: string[];
}

export const EmojiGrid: React.FC<EmojiGridProps> = ({ emojis }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
      {emojis.map((emojiSrc, index) => (
        <EmojiCard key={index} src={emojiSrc} index={index} />
      ))}
    </div>
  );
};
