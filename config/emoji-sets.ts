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

export const KOREAN_TEXT_EMOJIS = [
  "Character smiling brightly, holding up both thumbs, with the bold Korean word '럭키' written above in comic-style font.",
  "Character lying down lazily with half-closed eyes, next to the handwritten Korean text '귀찮아'.",
  "Character making a playful peace sign gesture with cheek puffed, with the cute handwritten word '쁘이' floating beside.",
  "Character eating happily with sparkling eyes, tongue slightly out, with the text '맛있어' in bold comic font.",
  "Character crying loudly with big tears streaming down, while the big handwritten Korean text '으앙' appears above.",
  "Character sleeping with a bubble from nose and 'Z' symbols, with the large Korean text '드르렁' in cartoon font.",
  "Character smiling with sparkling aura and two hands together, with pink text '행복해' above the head.",
  "Character looking down with teardrop eyes, next to the sad text '슬퍼' written in soft blue font.",
  "Character making a strong pose with fist pump, with big bold text '짱' in comic font style.",
  "Character making a heart sign with hands, with glowing text '하트' above.",
  "Character shyly blushing and covering cheeks with hands, with tiny text '힝' floating nearby.",
  "Character throwing confetti with a party popper, with big celebratory text '축하해'.",
  "Character laughing with closed eyes and open mouth, rolling with joy, and text '웃겨' in big wavy font.",
  "Character scratching back of head in embarrassment, with small shy text '머쓱'.",
  "Character crying with glistening eyes, with handwritten bold text '눈물나'.",
  "Character trembling with clenched fists, with jagged red text '부들부들'.",
  "Character amazed, wide-eyed, sparkles around, with the exclamation '우와' above.",
  "Character angry with puffed cheeks and steam, with flame-styled text '화나'.",
  "Character smirking shyly, scratching cheek, with small text '헤헤'.",
  "Character surprised, with hand on mouth, and the text '몰랐어' popping above head.",
  "Character dramatically waving goodbye with both hands, with the big text '끄읕'.",
  "Character putting on shoes, waving hand, with text '다녀올게'.",
  "Character pointing upward energetically, with the floating word '주목'.",
  "Character bowing politely with a smile, with neat text '수고했어'.",
  "Character waving hello, with big friendly text '안녕'.",
  "Character bowing deeply with a warm smile, with formal text '고마워'.",
  "Character smiling with both hands joined politely, with text '잘부탁드립니다'.",
  "Character peeking curiously from behind a wall, with small text '기웃기웃'.",
  "Character with empty pockets turned inside out, with droopy face, and text '돈없어'.",
  "Character frowning with crossed arms, with bold disappointed text '실망'.",
  "Character sitting at a desk with a book, sweating, with text '열공'.",
  "Character typing on a laptop with coffee, with text '열일'.",
  "Character holding up a phone and taking a selfie, with camera flash and text '찰칵'.",
  "Character revealing something dramatically, with spark effects and text '짜잔'.",
  "Character holding stomach with droopy eyes, with bubble text '꼬르륵'.",
];

export const EMOJI_SET_16 = [...CORE8, ...EXT8];
export const EMOJI_SET_24 = [...CORE8, ...EXT8, ...EXTRA8];
export const EMOJI_SET_32 = [...CORE8, ...EXT8, ...EXTRA8, ...KAKAO_EXTRA8];
export const EMOJI_SET_32_KOREAN = [
  ...CORE8,
  ...EXT8,
  ...EXTRA8,
  ...KAKAO_EXTRA8,
  ...KOREAN_TEXT_EMOJIS,
];
