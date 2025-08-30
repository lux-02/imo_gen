// src/config/emoji-sets.ts
export const CORE8 = [
  "Smiling face with thumbs up", // 웃음
  "Sending a heart with both hands", // 사랑
  "Surprised with a small sweat drop", // 놀람
  "Crying with big teardrops", // 울음
  "Angry with puffed cheeks + tiny steam puffs", // 화남
  "Winking with a playful smile", // 윙크
  "Laughing hard with eyes closed", // 폭소
  "Sad face with droopy eyes", // 슬픔
];

export const EXT8 = [
  "Neutral face with tiny dot eyes (expressionless)",
  "Sleeping with Z icon above head",
  "Cheering with a small flag",
  "Waving hand hello",
  "OK hand sign",
  "Crossed arms NO gesture",
  "Facepalm pose",
  "Sending finger heart with one hand",
];

export const EXTRA8 = [
  "Holding a coffee cup, cozy mood",
  "Gaming with a small controller",
  "Working on a tiny laptop",
  "Taking a selfie with a phone",
  "Dancing pose with a small note icon",
  "Celebrating with a party popper",
  "Walking in light rain with a tiny umbrella",
  "Giving a wrapped gift forward",
];

export const KAKAO_EXTRA8 = [
  "Blowing a kiss with a tiny heart floating", // 애정표현 추가
  "Rolling on the floor laughing (ROFL style)", // 강한 웃음
  "Clapping enthusiastically with spark lines", // 박수
  "Showing a shy blushing face with hands on cheeks", // 수줍음
  "Showing a tired yawning expression", // 피곤/하품
  "Holding up both hands in surrender / sorry pose", // 사과/미안
  "Cheering with pom-poms in both hands", // 응원
  "Giving a thumbs down with a disappointed face", // 부정/싫어
];

export const KOREAN_TEXT_EMOJIS: string[] = [
  // 1
  "Cheerful pose with both thumbs up. Add Korean text EXACTLY: '럭키'. Repeat: '럭키'. Place above head, bold Hangul with black outline + white fill. Do not translate or alter spelling. No extra letters.",
  // 2
  "Lazy, half-closed eyes. ",
  // 3
  "Playful peace sign with cheek puff. Add Korean text EXACTLY: '쁘이'. Repeat: '쁘이'. Place near hand, bold Hangul, black outline + white fill. No Latin letters.",
  // 4
  "Happy eating expression, tongue slightly out. Add a speech bubble containing EXACT text: '츄릅'. Repeat inside bubble: '츄릅'. Bold Hangul, high legibility. Do not translate.",
  // 5
  "Crying loudly with big tears. Add Korean text EXACTLY: '으앙'. Repeat: '으앙'. Place above head, bold Hangul, black outline + white fill. No other text.",
  // 6
  "Sleeping with nose bubble and Zs. ",
  // 7
  "Smiling with sparkles, hands together. Add Korean text EXACTLY: '해삐'. Repeat: '해삐'. Place above head, bold Hangul, black outline + pinkish fill.",
  // 8
  "Droopy sad eyes. Add Korean text EXACTLY: '힝'. Repeat: '힝'. Place above head, bold Hangul, black outline + light blue fill.",
  // 9
  "Strong fist-pump pose. Add Korean text EXACTLY: 'Good'. Repeat: 'Good'. Place above head, thick Hangul, black outline + golden fill.",
  // 10
  "Hands making a heart. Add Korean text EXACTLY: '하트'. Repeat: '하트'. Place above head, bold Hangul, black outline + pink fill.",
  // 11
  "Shy blush, hands on cheeks. Add Korean text EXACTLY: '힝'. Repeat: '힝'. Place near head, bold Hangul, black outline + white fill.",
  // 12
  "Confetti and party popper. Add Korean text EXACTLY: '축하'. Repeat: '축하'. Place above head, bold Hangul, black outline + gold fill.",
  // 13
  "Laughing hard, eyes closed. Add Korean text EXACTLY: 'ㅋㅋ'. Repeat: 'ㅋㅋ'. Place above head, bold Hangul, black outline + white fill.",
  // 14
  "Scratching back of head, embarrassed.",
  // 15
  "Tearful eyes starting to well.",
  // 16
  "Trembling with clenched fists. Add Korean text EXACTLY: '화나'. Repeat: '화나'. Place above head, jagged bold Hangul, black outline + red/orange fill.",
  // 17
  "Wide-eyed amazement with sparkles. Add Korean text EXACTLY: '우와'. Repeat: '우와'. Place above head, bold Hangul.",
  // 18
  "Angry with steam puffs. Add Korean text EXACTLY: '화나'. Repeat: '화나'. Place above head, bold Hangul, black outline + flame-like fill.",
  // 19
  "Shy smirk, scratching cheek. Add Korean text EXACTLY: 'ㅎㅎ'. Repeat: 'ㅎㅎ'. Place near head, bold Hangul.",
  // 20
  "Surprised, hand on mouth.",
  // 21
  "Dramatic farewell wave. Add Korean text EXACTLY: 'END'. Repeat: 'END'. Place above head, bold Hangul, solid black fill with white stroke.",
  // 22
  "Putting on shoes, waving. Add Korean text EXACTLY: '다녀올게'. Repeat: '다녀올게'. Place above head, bold Hangul.",
  // 23
  "Pointing upward energetically. Add Korean text EXACTLY: '주목'. Repeat: '주목'. Place above head, bold Hangul.",
  // 24
  "Polite bow with smile.",
  // 25
  "Waving hello. Add Korean text EXACTLY: '안녕'. Repeat: '안녕'. Place above head, bold Hangul.",
  // 26
  "Deep polite bow with warm smile. Add a speech bubble containing EXACT text: '고마워'. Repeat inside bubble: '고마워'. Bold Hangul, high legibility.",
  // 27
  "Polite request pose (hands together).",
  // 28
  "Peeking from behind a wall.",
  // 29
  "Empty pockets turned inside out, droopy face. Add a speech bubble containing EXACT text: 'NO MONEY'. Repeat inside bubble: 'NO MONEY'. Bold Hangul.",
  // 30
  "Arms crossed with disappointed face. Add Korean text EXACTLY: '시러'. Repeat: '시러'. Place above head, bold Hangul.",
  // 31
  "Studying hard at desk with sweat.",
  // 32
  "Working hard on laptop with coffee. ",
  // 33
  "Taking a selfie with phone flash. ",
  // 34
  "Revealing something with spark effects. Add Korean text EXACTLY: '짠'. Repeat: '짠'. Place above head, bold Hangul.",
  // 35
  "Holding stomach, hungry expression. Add a speech bubble containing EXACT text: '배고파'. Repeat inside bubble: '배고파'. Bold Hangul.",
];

export const EMOJI_SET_16 = [...CORE8, ...EXT8];
export const EMOJI_SET_24 = [...CORE8, ...EXT8, ...EXTRA8];
export const EMOJI_SET_32 = [...CORE8, ...EXT8, ...EXTRA8, ...KAKAO_EXTRA8];
export const EMOJI_SET_32_KOREAN = [...KOREAN_TEXT_EMOJIS];

// 사용 가능한 이모티콘 세트 옵션들
export const EMOJI_SET_OPTIONS = [
  {
    id: "emoji_16",
    name: "Basic Set (16개)",
    description: "기본 감정과 상황 표현",
    count: 16,
    set: EMOJI_SET_16,
  },
  {
    id: "emoji_24",
    name: "Extended Set (24개)",
    description: "기본 + 추가 상황 표현",
    count: 24,
    set: EMOJI_SET_24,
  },
  {
    id: "emoji_32",
    name: "Full Set (32개)",
    description: "모든 기본 + 카카오톡 스타일",
    count: 32,
    set: EMOJI_SET_32,
  },
  {
    id: "emoji_32_korean",
    name: "Korean Set (35개)",
    description: "한국어 텍스트가 포함된 이모티콘",
    count: 35,
    set: EMOJI_SET_32_KOREAN,
  },
] as const;

export type EmojiSetOption = (typeof EMOJI_SET_OPTIONS)[number];
