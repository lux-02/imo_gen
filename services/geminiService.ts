import { GoogleGenAI, Modality } from "@google/genai";

// Vite 환경변수 접근 방식으로 수정
const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ VITE_GEMINI_API_KEY environment variable not set!");
  console.error("📝 Please create a .env file in the project root with:");
  console.error("   VITE_GEMINI_API_KEY=your_actual_gemini_api_key");
  console.error("🔄 Then restart the development server.");
  throw new Error(
    "VITE_GEMINI_API_KEY environment variable not set. Please create a .env file with your Gemini API key and restart the server."
  );
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const basePrompt = `
You are an expert emoji and sticker designer. Your task is to re-render a character based on a reference image, applying a specific action or emotion while maintaining perfect consistency.

**Style Requirements:**
- **Output:** A single sticker-like emoji.
- **Background:** MUST be transparent.
- **Resolution:** 1024x1024.
- **Art Style:** Clean, with a bold outline and vivid colors. Match the reference image's style exactly.
- **Consistency:** The character's hairstyle, face shape, outfit, and color palette MUST be identical to the reference image.
- **Exclusions:** Do NOT add any text, watermarks, or extra decorative elements not specified in the action.

**Action to Render:**
`;

// Base64 데이터에서 data: URL 스키마 제거하는 함수
const cleanBase64Data = (base64String: string): string => {
  // data:image/png;base64, 형태의 문자열에서 base64 부분만 추출
  if (base64String.includes(",")) {
    return base64String.split(",")[1];
  }
  return base64String;
};

// MIME 타입을 정확하게 매핑하는 함수
const getMimeType = (fileType: string): string => {
  const mimeTypeMap: Record<string, string> = {
    "image/png": "image/png",
    "image/jpeg": "image/jpeg",
    "image/jpg": "image/jpeg",
    "image/webp": "image/webp",
  };

  return mimeTypeMap[fileType] || "image/png";
};

const generateSingleEmoji = async (
  base64Image: string,
  mimeType: string,
  actionPrompt: string
): Promise<string> => {
  try {
    // Base64 데이터 정리
    const cleanBase64 = cleanBase64Data(base64Image);
    const correctMimeType = getMimeType(mimeType);

    console.log("Processing image with:", {
      originalMimeType: mimeType,
      correctedMimeType: correctMimeType,
      base64Length: cleanBase64.length,
    });

    const fullPrompt = `${basePrompt}"${actionPrompt}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: correctMimeType,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData
    );

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      console.warn(
        "No image part found in response for prompt:",
        actionPrompt,
        response
      );
      // Try to get text for debugging
      const textPart = response.candidates?.[0]?.content?.parts?.find(
        (part) => part.text
      );
      if (textPart?.text) {
        throw new Error(
          `API returned text instead of image: ${textPart.text.substring(
            0,
            100
          )}...`
        );
      }
      throw new Error(`No image data returned for prompt: "${actionPrompt}"`);
    }
  } catch (error) {
    console.error(
      `Error generating emoji for prompt "${actionPrompt}":`,
      error
    );

    // 더 자세한 에러 정보 제공
    if (error instanceof Error) {
      if (error.message.includes("INVALID_ARGUMENT")) {
        throw new Error(
          `Invalid image format or data. Please ensure the image is a valid PNG, JPEG, or WebP file under 4MB.`
        );
      }
      if (error.message.includes("API_KEY")) {
        throw new Error(
          `API key configuration error. Please check your VITE_GEMINI_API_KEY environment variable.`
        );
      }
      throw new Error(
        `Failed to generate emoji for: "${actionPrompt}". ${error.message}`
      );
    }

    throw new Error(
      `Failed to generate emoji for: "${actionPrompt}". Please check console for details.`
    );
  }
};

export const generateEmojis = async (
  base64Image: string,
  mimeType: string,
  prompts: string[],
  onProgress: (progress: number) => void
): Promise<string[]> => {
  const allPromises = prompts.map((prompt) =>
    generateSingleEmoji(base64Image, mimeType, prompt)
  );

  const results: string[] = [];
  let completed = 0;

  for (const promise of allPromises) {
    try {
      const result = await promise;
      results.push(result);
    } catch (e) {
      // In case one fails, we can push a placeholder or just skip it
      console.error("A single emoji generation failed, skipping:", e);
    } finally {
      completed++;
      onProgress((completed / prompts.length) * 100);
    }
  }

  if (results.length === 0 && prompts.length > 0) {
    throw new Error(
      "All emoji generation attempts failed. The API might be unavailable or the input image may be unsuitable."
    );
  }

  return results;
};
