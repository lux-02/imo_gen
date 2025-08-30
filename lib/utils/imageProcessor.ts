// imageProcessor.ts - 이미지 품질 향상을 위한 사후 처리 유틸리티

export interface ImageProcessingOptions {
  sharpen?: number; // 0.0 ~ 1.0, 기본값 0.5
  upscale?: boolean; // 2048x2048로 업샘플 후 다운샘플
  forcePNG?: boolean; // PNG 재인코딩 강제
  backgroundMode?: "transparent" | "white";
}

/**
 * 이미지 품질 향상을 위한 사후 처리
 * @param imageData - Base64 이미지 데이터
 * @param options - 처리 옵션
 * @returns 처리된 Base64 이미지 데이터
 */
export async function enhanceImageQuality(
  imageData: string,
  options: ImageProcessingOptions = {}
): Promise<string> {
  try {
    const {
      sharpen = 0.5,
      upscale = false,
      forcePNG = false,
      backgroundMode = "transparent",
    } = options;

    // Canvas 생성
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context not available");
    }

    // 이미지 로드
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageData;
    });

    // 원본 크기 설정
    canvas.width = img.width;
    canvas.height = img.height;

    // 배경 모드에 따른 처리
    if (backgroundMode === "white") {
      // 흰색 배경으로 강제 변환
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 이미지 그리기
    ctx.drawImage(img, 0, 0);

    // 업샘플링 처리 (필요시)
    if (upscale && (img.width < 1024 || img.height < 1024)) {
      const upscaledCanvas = await upscaleImage(canvas, 2048, 2048);
      const downscaledCanvas = await downscaleImage(upscaledCanvas, 1024, 1024);
      return downscaledCanvas.toDataURL("image/png", 1.0);
    }

    // 선명화 처리
    if (sharpen > 0) {
      await applySharpen(canvas, sharpen);
    }

    // PNG 강제 변환
    if (forcePNG) {
      return canvas.toDataURL("image/png", 1.0);
    }

    return canvas.toDataURL("image/png", 1.0);
  } catch (error) {
    console.error("Image enhancement failed:", error);
    return imageData; // 실패시 원본 반환
  }
}

/**
 * 이미지 업샘플링 (Lanczos3 커널 사용)
 */
async function upscaleImage(
  canvas: HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number
): Promise<HTMLCanvasElement> {
  const newCanvas = document.createElement("canvas");
  const newCtx = newCanvas.getContext("2d");
  if (!newCtx) throw new Error("Canvas context not available");

  newCanvas.width = targetWidth;
  newCanvas.height = targetHeight;

  // 고품질 이미지 스무딩 비활성화
  newCtx.imageSmoothingEnabled = false;

  // 이미지 그리기 (업샘플링)
  newCtx.drawImage(canvas, 0, 0, targetWidth, targetHeight);

  return newCanvas;
}

/**
 * 이미지 다운샘플링 (고품질)
 */
async function downscaleImage(
  canvas: HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number
): Promise<HTMLCanvasElement> {
  const newCanvas = document.createElement("canvas");
  const newCtx = newCanvas.getContext("2d");
  if (!newCtx) throw new Error("Canvas context not available");

  newCanvas.width = targetWidth;
  newCanvas.height = targetHeight;

  // 고품질 다운샘플링 설정
  newCtx.imageSmoothingEnabled = true;
  newCtx.imageSmoothingQuality = "high";

  // 이미지 그리기 (다운샘플링)
  newCtx.drawImage(canvas, 0, 0, targetWidth, targetHeight);

  return newCanvas;
}

/**
 * Unsharp Mask를 사용한 선명화 처리
 */
async function applySharpen(
  canvas: HTMLCanvasElement,
  intensity: number
): Promise<void> {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  // Unsharp Mask 적용
  const sharpened = new Uint8ClampedArray(data);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        // RGB 채널만 처리 (알파 제외)
        const idx = (y * width + x) * 4 + c;

        // 주변 픽셀들의 평균값 계산
        const neighbors = [
          data[((y - 1) * width + x) * 4 + c], // 위
          data[((y + 1) * width + x) * 4 + c], // 아래
          data[(y * width + x - 1) * 4 + c], // 왼쪽
          data[(y * width + x + 1) * 4 + c], // 오른쪽
        ];

        const avg =
          neighbors.reduce((sum, val) => sum + val, 0) / neighbors.length;
        const current = data[idx];

        // Unsharp Mask 공식: 원본 + (원본 - 블러) * 강도
        const diff = current - avg;
        sharpened[idx] = Math.max(0, Math.min(255, current + diff * intensity));
      }
    }
  }

  // 처리된 이미지 데이터를 캔버스에 적용
  const newImageData = new ImageData(sharpened, width, height);
  ctx.putImageData(newImageData, 0, 0);
}

/**
 * 배경 모드 감지 및 자동 수정
 */
export function detectAndFixBackground(imageData: string): string {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return imageData;

    const img = new Image();
    img.src = imageData;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageDataObj.data;

    let hasTransparency = false;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) {
        hasTransparency = true;
        break;
      }
    }

    // 투명도가 없으면 흰색 배경으로 처리
    if (!hasTransparency) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/png", 1.0);
    }

    return imageData;
  } catch (error) {
    console.error("Background detection failed:", error);
    return imageData;
  }
}

/**
 * 이미지 품질 검증
 */
export function validateImageQuality(imageData: string): {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      issues.push("Canvas context not available");
      return { isValid: false, issues, recommendations };
    }

    const img = new Image();
    img.src = imageData;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // 해상도 검증
    if (img.width !== 1024 || img.height !== 1024) {
      issues.push(
        `Invalid resolution: ${img.width}x${img.height} (expected 1024x1024)`
      );
      recommendations.push("Use exact 1024x1024 resolution");
    }

    // 이미지 데이터 분석
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageDataObj.data;

    // 블러/노이즈 검증 (간단한 엣지 검출)
    let edgeCount = 0;
    for (let y = 1; y < canvas.height - 1; y++) {
      for (let x = 1; x < canvas.width - 1; x++) {
        const idx = (y * canvas.width + x) * 4;
        const current = data[idx];
        const right = data[idx + 4];
        const down = data[idx + canvas.width * 4];

        if (Math.abs(current - right) > 30 || Math.abs(current - down) > 30) {
          edgeCount++;
        }
      }
    }

    const edgeRatio = edgeCount / (canvas.width * canvas.height);
    if (edgeRatio < 0.01) {
      issues.push("Image appears too blurry or lacks sharp edges");
      recommendations.push("Apply sharpening filter");
    }

    // 투명도 검증
    let hasTransparency = false;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) {
        hasTransparency = true;
        break;
      }
    }

    if (!hasTransparency) {
      recommendations.push(
        "Consider adding transparency for better integration"
      );
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations,
    };
  } catch (error) {
    issues.push(`Validation error: ${error}`);
    return { isValid: false, issues, recommendations };
  }
}
