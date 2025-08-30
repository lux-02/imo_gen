export type Palette = {
  name: string;
  primary: string; // HEX
  secondary?: string;
  accent?: string;
  neutral?: string;
};

export type StyleRule = {
  name: string;
  rule: string; // 스타일 가이드 문장
};

export type ImageCategory = string;

export type PresetSelection<T> = T | "custom";

export type CustomPalette = {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
};

export type CustomStyle = string;
