import React, { useState, useCallback } from "react";
import { Header } from "./components/Header";
import { ImageUploader } from "./components/ImageUploader";
import { EmojiGrid } from "./components/EmojiGrid";
import { Loader } from "./components/Loader";
import { generateEmojis } from "./services/geminiService";
import { EMOJI_PROMPTS } from "./constants";
import { Palette, StyleRule } from "./types/image";

interface ReferenceImage {
  file: File;
  base64: string;
  settings: {
    imageCategory: string;
    style: StyleRule | string;
    palette: Palette;
    backgroundMode: "transparent" | "white";
  };
}

const App: React.FC = () => {
  const [referenceImage, setReferenceImage] = useState<ReferenceImage | null>(
    null
  );
  const [generatedEmojis, setGeneratedEmojis] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (
    file: File,
    base64: string,
    settings: {
      imageCategory: string;
      style: StyleRule | string;
      palette: Palette;
      backgroundMode: "transparent" | "white";
    }
  ) => {
    setReferenceImage({ file, base64, settings });
    setGeneratedEmojis([]);
    setError(null);
    setProgress(0);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!referenceImage) {
      setError("Please upload a reference image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedEmojis([]);
    setProgress(0);

    try {
      const results = await generateEmojis(
        referenceImage.base64,
        referenceImage.file.type,
        EMOJI_PROMPTS,
        (p) => setProgress(p),
        referenceImage.settings
      );
      setGeneratedEmojis(results);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred during emoji generation."
      );
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  }, [referenceImage]);

  const handleClear = () => {
    setReferenceImage(null);
    setGeneratedEmojis([]);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!isLoading && !referenceImage && (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}

          {referenceImage && (
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">
                Reference Character
              </h2>
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <img
                  src={referenceImage.base64}
                  alt="Reference Character"
                  className="w-32 h-32 object-contain rounded-lg bg-slate-700/50 p-1 flex-shrink-0"
                />
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <p className="text-slate-300">
                      Ready to generate your emoji set?
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-slate-700 px-2 py-1 rounded">
                        Category:{" "}
                        <span className="text-cyan-400">
                          {referenceImage.settings.imageCategory}
                        </span>
                      </span>
                      <span className="bg-slate-700 px-2 py-1 rounded">
                        Background:{" "}
                        <span className="text-cyan-400">
                          {referenceImage.settings.backgroundMode}
                        </span>
                      </span>
                      <span className="bg-slate-700 px-2 py-1 rounded">
                        Style:{" "}
                        <span className="text-cyan-400">
                          {typeof referenceImage.settings.style === "string"
                            ? "Custom"
                            : referenceImage.settings.style.name}
                        </span>
                      </span>
                      <span className="bg-slate-700 px-2 py-1 rounded">
                        Palette:{" "}
                        <span className="text-cyan-400">
                          {referenceImage.settings.palette.name}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleGenerateClick}
                      disabled={isLoading}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Generating..." : "Generate 32 Emojis"}
                    </button>
                    <button
                      onClick={handleClear}
                      disabled={isLoading}
                      className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center">
              <Loader />
              <p className="text-lg text-cyan-400 mt-4">
                Generating your 32 emoji set...
              </p>
              <p className="text-slate-400">
                This may take a minute or two. Please be patient.
              </p>
              <div className="w-full bg-slate-700 rounded-full h-2.5 mt-4">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-2">{Math.round(progress)}% complete</p>
            </div>
          )}

          {error && (
            <div
              className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {generatedEmojis.length > 0 && !isLoading && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">
                Your 32 Emoji Set
              </h2>
              <EmojiGrid
                emojis={generatedEmojis}
                settings={referenceImage?.settings}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
