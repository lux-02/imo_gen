// HEX 색상 검증
export const isValidHex = (hex: string): boolean => {
  const hexRegex = /^#([0-9A-F]{6}|[0-9A-F]{3})$/i;
  return hexRegex.test(hex);
};

// HEX 색상 정규화 (대문자, # 자동 보정)
export const normalizeHex = (hex: string): string => {
  let normalized = hex.trim();

  // # 없으면 추가
  if (!normalized.startsWith("#")) {
    normalized = "#" + normalized;
  }

  // 3자리 HEX를 6자리로 확장
  if (normalized.length === 4) {
    normalized =
      "#" +
      normalized[1] +
      normalized[1] +
      normalized[2] +
      normalized[2] +
      normalized[3] +
      normalized[3];
  }

  return normalized.toUpperCase();
};

// 색상 대비 계산 (접근성 검증용)
export const getContrastRatio = (hex1: string, hex2: string): number => {
  const getLuminance = (hex: string): number => {
    const rgb =
      hex.match(/[0-9a-f]{2}/gi)?.map((x) => parseInt(x, 16) / 255) || [];
    const [r, g, b] = rgb.map((c) => {
      if (c <= 0.03928) return c / 12.92;
      return Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);

  return (brightest + 0.05) / (darkest + 0.05);
};

// 문자열 슬러그 생성
export const createSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};
