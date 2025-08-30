import React from "react";
import JSZip from "jszip";
import { EmojiCard } from "./EmojiCard";
import { DownloadIcon } from "./icons";
import { createSlug } from "../lib/utils/validation";

interface EmojiGridProps {
  emojis: string[];
  settings?: {
    imageCategory: string;
    style: any;
    palette: any;
  };
}

export const EmojiGrid: React.FC<EmojiGridProps> = ({ emojis, settings }) => {
  const downloadAllAsZip = async () => {
    try {
      const zip = new JSZip();
      const emojiFolder = zip.folder("emojis");

      // 각 이모티콘을 ZIP에 추가
      emojis.forEach((emojiSrc, index) => {
        try {
          // Base64 데이터에서 실제 이미지 데이터 추출
          const base64Data = emojiSrc.includes(",")
            ? emojiSrc.split(",")[1]
            : emojiSrc;
          const mimeType = emojiSrc.match(/data:([^;]+)/)?.[1] || "image/png";
          const extension = mimeType.split("/")[1] || "png";

          // 새로운 파일명 규칙 적용
          let fileName: string;
          if (settings) {
            const categorySlug = createSlug(settings.imageCategory);
            const styleSlug =
              typeof settings.style === "string"
                ? "custom"
                : createSlug(settings.style.name);
            const paletteSlug = createSlug(settings.palette.name);
            fileName = `${categorySlug}_${styleSlug}_${paletteSlug}_v${
              index + 1
            }.${extension}`;
          } else {
            // 기존 방식 (fallback) - 32개에 맞게 수정
            const emotionNames = [
              "happy",
              "love",
              "surprised",
              "crying",
              "angry",
              "winking",
              "laughing",
              "sad",
              "neutral",
              "sleeping",
              "cheering",
              "waving",
              "ok",
              "no",
              "facepalm",
              "fingerheart",
              "coffee",
              "gaming",
              "working",
              "selfie",
              "dancing",
              "celebrating",
              "rain",
              "gift",
              "kiss",
              "rofl",
              "clapping",
              "shy",
              "tired",
              "surrender",
              "pompons",
              "thumbsdown",
            ];
            fileName = `${
              emotionNames[index] || `emoji_${index + 1}`
            }.${extension}`;
          }

          emojiFolder?.file(fileName, base64Data, { base64: true });
        } catch (error) {
          console.error(`Error processing emoji ${index}:`, error);
        }
      });

      // ZIP 파일 생성 및 다운로드
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "character_emojis.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating ZIP file:", error);
      alert("ZIP 파일 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="space-y-6">
      {/* 전체 다운로드 버튼 */}
      <div className="flex justify-center">
        <button
          onClick={downloadAllAsZip}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <DownloadIcon />
          전체 다운로드 (ZIP)
        </button>
      </div>

      {/* 이모티콘 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {emojis.map((emojiSrc, index) => (
          <EmojiCard key={index} src={emojiSrc} index={index} />
        ))}
      </div>
    </div>
  );
};
