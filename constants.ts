import { EMOJI_SET_OPTIONS, EMOJI_SET_32_KOREAN } from "./config/emoji-sets";

// 기본값으로 한국어 세트 사용
export const DEFAULT_EMOJI_SET = EMOJI_SET_OPTIONS.find(
  (option) => option.id === "emoji_32_korean"
)!;

export const EMOJI_PROMPTS: string[] = DEFAULT_EMOJI_SET.set;
