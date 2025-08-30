import { Palette, StyleRule } from "../types/image";

export const COLOR_PRESETS: Palette[] = [
  {
    name: "Default",
    primary: "#auto",
    secondary: "#auto",
    accent: "#auto",
    neutral: "#auto",
  },
  {
    name: "Sunset Pop",
    primary: "#FF6B6B",
    secondary: "#FFD166",
    accent: "#4ECDC4",
    neutral: "#2B2D42",
  },
  {
    name: "Mint Soda",
    primary: "#00C2A8",
    secondary: "#9AE6B4",
    accent: "#5AA9E6",
    neutral: "#2F3E46",
  },
  {
    name: "Mono Ink",
    primary: "#111111",
    secondary: "#444444",
    accent: "#777777",
    neutral: "#FFFFFF", // outlines/shadows는 흑백 대비로 처리
  },
] as const;

export const STYLE_PRESETS: StyleRule[] = [
  {
    name: "Default",
    rule: "natural style matching the reference image, preserve original art style, maintain consistent proportions and character identity, subtle enhancements only",
  },
  {
    name: "Flat Vector",
    rule: "flat vector, bold uniform outline (~3px feel), minimal shading, high-contrast color blocks, clean sticker edges",
  },
  {
    name: "Soft Pastel",
    rule: "soft pastel tones, subtle soft shadows, gentle gradients, thin outline (~1-2px), low contrast, cute chibi vibe",
  },
  {
    name: "3D Glossy",
    rule: "semi-3D glossy sticker, soft specular highlights, gentle rim light, rounded forms, smooth shading, clean cutout",
  },
] as const;

export const IMAGE_CATEGORIES = [
  "Character",
  "Animal",
  "Robot",
  "Fantasy",
  "Anime",
  "Cartoon",
  "Realistic",
  "Abstract",
] as const;
