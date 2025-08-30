import React, { useState, useCallback } from "react";
import { UploadIcon } from "./icons";
import { PresetSelector } from "./PresetSelector";
import { ColorPicker } from "./ColorPicker";
import {
  COLOR_PRESETS,
  STYLE_PRESETS,
  IMAGE_CATEGORIES,
} from "../config/presets";
import { EMOJI_SET_OPTIONS } from "../config/emoji-sets";
import {
  Palette,
  StyleRule,
  CustomPalette,
  CustomStyle,
  EmojiSetSelection,
} from "../types/image";
import { isValidHex } from "../lib/utils/validation";

interface ImageUploaderProps {
  onImageUpload: (
    file: File,
    base64: string,
    settings: {
      imageCategory: string;
      style: StyleRule | CustomStyle;
      palette: Palette;
      backgroundMode: "transparent" | "white";
      selectedEmojiSet: EmojiSetSelection;
    }
  ) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [imageCategory, setImageCategory] = useState<string>("Character");
  const [selectedStyle, setSelectedStyle] = useState<StyleRule | "custom">(
    STYLE_PRESETS[0] // Default 프리셋
  );
  const [selectedPalette, setSelectedPalette] = useState<Palette | "custom">(
    COLOR_PRESETS[0] // Default 프리셋
  );
  const [backgroundMode, setBackgroundMode] = useState<"transparent" | "white">(
    "transparent"
  );
  const [selectedEmojiSet, setSelectedEmojiSet] = useState<EmojiSetSelection>(
    EMOJI_SET_OPTIONS[3] // 기본값으로 한국어 세트 (35개)
  );
  const [customStyle, setCustomStyle] = useState<string>("");
  const [customPalette, setCustomPalette] = useState<CustomPalette>({
    primary: "#FF6B6B",
    secondary: "#FFD166",
    accent: "#4ECDC4",
    neutral: "#2B2D42",
  });

  const handleFileChange = useCallback(
    async (files: FileList | null) => {
      setError(null);
      if (!files || files.length === 0) {
        return;
      }
      const file = files[0];
      const validTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload a PNG, JPG, or WEBP image.");
        return;
      }

      // 파일 크기 제한을 2MB로 줄여서 431 에러 방지
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setError(
          "File is too large. Please upload an image under 2MB to avoid server errors."
        );
        return;
      }

      try {
        const base64 = await fileToBase64(file);

        // 현재 설정으로 이미지 업로드
        const settings = {
          imageCategory,
          style: selectedStyle === "custom" ? customStyle : selectedStyle,
          palette:
            selectedPalette === "custom" ? customPalette : selectedPalette,
          backgroundMode,
          selectedEmojiSet,
        };

        onImageUpload(file, base64, settings);
      } catch (err) {
        setError("Failed to read the image file.");
      }
    },
    [
      onImageUpload,
      imageCategory,
      selectedStyle,
      selectedPalette,
      customStyle,
      customPalette,
      backgroundMode,
      selectedEmojiSet,
    ]
  );

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  const isFormValid = () => {
    if (selectedStyle === "custom" && !customStyle.trim()) return false;
    if (selectedPalette === "custom") {
      return (
        isValidHex(customPalette.primary) &&
        isValidHex(customPalette.secondary) &&
        isValidHex(customPalette.accent) &&
        isValidHex(customPalette.neutral)
      );
    }
    return true;
  };

  return (
    <div className="space-y-6">
      {/* 이미지 업로드 섹션 */}
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg border-2 border-dashed border-slate-600 hover:border-cyan-500 transition-colors">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <div className="text-cyan-400 mb-4">
            <UploadIcon />
          </div>
          <h2 className="text-xl font-semibold mb-2">Upload Reference Image</h2>
          <p className="text-slate-400 text-center">
            Drag & drop your character image here, or click to browse.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            PNG with transparent background is recommended (Max 2MB to avoid
            server errors).
          </p>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </label>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>

      {/* 프리셋 설정 섹션 */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-600">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">
          Style & Color Settings
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Configure your settings to generate {selectedEmojiSet.count}{" "}
          high-quality emojis based on your reference image.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image Category */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Image Category
            </label>
            <select
              value={imageCategory}
              onChange={(e) => setImageCategory(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              {IMAGE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Background Mode */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Background Mode
            </label>
            <select
              value={backgroundMode}
              onChange={(e) =>
                setBackgroundMode(e.target.value as "transparent" | "white")
              }
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="transparent">Transparent</option>
              <option value="white">White Background</option>
            </select>
          </div>

          {/* Emoji Set Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Emoji Set
            </label>
            <select
              value={selectedEmojiSet.id}
              onChange={(e) => {
                const selected = EMOJI_SET_OPTIONS.find(
                  (option) => option.id === e.target.value
                );
                if (selected) setSelectedEmojiSet(selected);
              }}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              {EMOJI_SET_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">
              {selectedEmojiSet.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Style Preset */}
          <PresetSelector
            label="Art Style"
            presets={STYLE_PRESETS}
            value={selectedStyle}
            onChange={setSelectedStyle}
            getDisplayName={(style) => style.name}
            renderCustomField={() => (
              <textarea
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
                placeholder="Describe your custom art style (e.g., 'watercolor with soft edges, muted tones')"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none"
                rows={3}
              />
            )}
          />

          {/* Color Preset */}
          <PresetSelector
            label="Color Palette"
            presets={COLOR_PRESETS}
            value={selectedPalette}
            onChange={setSelectedPalette}
            getDisplayName={(palette) => palette.name}
            renderCustomField={() => (
              <div className="space-y-3">
                <ColorPicker
                  label="Primary"
                  value={customPalette.primary}
                  onChange={(value) =>
                    setCustomPalette((prev) => ({ ...prev, primary: value }))
                  }
                  placeholder="#FF6B6B"
                />
                <ColorPicker
                  label="Secondary"
                  value={customPalette.secondary}
                  onChange={(value) =>
                    setCustomPalette((prev) => ({ ...prev, secondary: value }))
                  }
                  placeholder="#FFD166"
                />
                <ColorPicker
                  label="Accent"
                  value={customPalette.accent}
                  onChange={(value) =>
                    setCustomPalette((prev) => ({ ...prev, accent: value }))
                  }
                  placeholder="#4ECDC4"
                />
                <ColorPicker
                  label="Neutral"
                  value={customPalette.neutral}
                  onChange={(value) =>
                    setCustomPalette((prev) => ({ ...prev, neutral: value }))
                  }
                  placeholder="#2B2D42"
                />
              </div>
            )}
          />
        </div>

        {/* 미리보기 섹션 */}
        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
          <h4 className="text-sm font-medium text-slate-300 mb-3">Preview</h4>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-400">
              Category: <span className="text-cyan-400">{imageCategory}</span>
            </span>
            <span className="text-xs text-slate-400">
              Background:{" "}
              <span className="text-cyan-400">{backgroundMode}</span>
            </span>
            <span className="text-xs text-slate-400">
              Emoji Set:{" "}
              <span className="text-cyan-400">{selectedEmojiSet.name}</span>
            </span>
            <span className="text-xs text-slate-400">
              Style:{" "}
              <span className="text-cyan-400">
                {selectedStyle === "custom"
                  ? "Custom"
                  : (selectedStyle as StyleRule).name}
              </span>
            </span>
            <span className="text-xs text-slate-400">
              Palette:{" "}
              <span className="text-cyan-400">
                {selectedPalette === "custom"
                  ? "Custom"
                  : (selectedPalette as Palette).name}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
