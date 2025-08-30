
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm py-4 border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-cyan-400">Character Emoji Generator</h1>
        <p className="text-slate-300 mt-1">
          Turn your character into a full emoji set with consistent styling.
        </p>
      </div>
    </header>
  );
};
