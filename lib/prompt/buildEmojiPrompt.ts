// buildEmojiPrompt.ts
import { Palette, StyleRule } from "../../types/image";
import { EMOJI_SET_32 } from "@/config/emoji-sets";

type BackgroundMode = "transparent" | "white";

const bgSentence = (mode: BackgroundMode) =>
  mode === "transparent"
    ? [
        "- Background: strictly transparent alpha (true PNG transparency).",
        "- Do NOT add any background colors, gradients, patterns, or checkerboard-like tiles.",
        "- No drop shadows, outer glows, or faux transparency effects.",
        "- No checkerboard patterns, no grid lines, no texture overlays.",
        "- Pure transparency only - no semi-transparent backgrounds.",
      ].join("\n")
    : [
        "- Background: solid pure white (#FFFFFF) only.",
        "- Do NOT use gradients, textures, patterns, or checkerboard-like tiles.",
        "- No drop shadows or outer glows.",
        "- No checkerboard patterns, no grid lines, no texture overlays.",
        "- Pure white background only - no off-white or tinted backgrounds.",
      ].join("\n");

const qualitySentence = () =>
  [
    "- Resolution: 4k high-quality upscaled pixels.",
    "- Anti-aliasing: crisp, sharp outlines with smooth edges.",
    "- No blur, no noise, no compression artifacts.",
    "- Line quality: consistent thickness, no broken or jagged lines.",
    "- Color fidelity: no color bleeding, no banding, no dithering.",
    "- Sharpness: maximum detail preservation, no soft or fuzzy areas.",
  ].join("\n");

const paletteSentence = (p: Palette) => {
  if (p.name === "Default") {
    return "Use colors that naturally complement the reference image. Preserve the original color harmony and mood. Avoid drastic color changes that would alter the character's established appearance.";
  }
  const parts = [
    `Use the palette "${p.name}"`,
    `primary ${p.primary}`,
    p.secondary && `secondary ${p.secondary}`,
    p.accent && `accent ${p.accent}`,
    p.neutral && `neutral ${p.neutral}`,
  ].filter(Boolean);
  return (
    parts.join(", ") +
    ". Prefer on-palette tones; avoid off-palette hues. " +
    "Use primary for outfit main blocks, secondary for cheeks/accents, accent for props, neutral for outlines/shadows."
  );
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function buildEmojiPrompt(params: {
  imageCategory: string;
  style: StyleRule | string; // preset or custom
  palette: Palette;
  backgroundMode?: BackgroundMode;
}) {
  const {
    imageCategory,
    style,
    palette,
    backgroundMode = "transparent",
  } = params;
  const styleText = typeof style === "string" ? style : style.rule;

  const styleConstraint =
    typeof style === "string" && style === "Default"
      ? "Preserve the original art style and technique from the reference image. Make minimal style adjustments to maintain consistency."
      : `Lock art style to: ${styleText}.`;

  const system = [
    "You are an advanced image editor/generator producing a consistent character emoji set.",
    "Hard constraints:",
    "- Keep identity: face shape, hairstyle, outfit, proportions.",
    `- ${styleConstraint}`,
    `- ${paletteSentence(palette)}`,
    `- Match thematic category: ${imageCategory}.`,
    bgSentence(backgroundMode),
    qualitySentence(),
    "- Output format: PNG (lossless, no compression artifacts).",
    "- Composition: centered character with a 6–8% safe margin on all sides.",
    "- For each variation, only change expression/pose/small props.",
    "- Quality priority: sharpness and clarity over artistic effects.",
  ].join("\n");

  const variations = EMOJI_SET_32.map((v, i) => `${i + 1}) ${v}`).join("\n");

  const user = [
    "Reference image: <uploaded_image>",
    "Generate 32 high-quality PNGs following the constraints above.",
    "Keep the same outfit silhouette, hair length, and base colors.",
    "Ensure consistent line thickness, lighting, and shading per the locked style.",
    "Focus on maximum sharpness and clarity - avoid any blur or noise.",
    "",
    "Variations to render (32 total):",
    variations,
    "",
    "File names:",
    `${slug(imageCategory)}_${slug(
      typeof style === "string" ? "custom" : style.name
    )}_${slug(palette.name)}_v{index}.png`,
  ].join("\n");

  return { system, user };
}
