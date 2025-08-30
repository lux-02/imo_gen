import React, { useState, useEffect, useMemo } from "react";
import { DownloadIcon } from "./icons";

interface EmojiCardProps {
  src: string;
  index: number;
}

export const EmojiCard: React.FC<EmojiCardProps> = ({ src, index }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Base64 데이터를 Blob URL로 변환하여 메모리 사용량 줄이기
  const blobUrl = useMemo(() => {
    try {
      if (!src) return "";

      // Base64 데이터에서 실제 이미지 데이터 추출
      const base64Data = src.includes(",") ? src.split(",")[1] : src;
      const mimeType = src.match(/data:([^;]+)/)?.[1] || "image/png";

      // Base64를 Blob으로 변환
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error creating blob URL:", error);
      return src; // 실패 시 원본 사용
    }
  }, [src]);

  // 컴포넌트 언마운트 시 Blob URL 정리
  useEffect(() => {
    return () => {
      if (blobUrl && blobUrl !== src) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl, src]);

  const handleDownload = () => {
    try {
      // 감정/동작 기반 파일명 생성
      const emotionNames = [
        "happy",
        "love",
        "surprised",
        "crying",
        "angry",
        "winking",
        "laughing",
        "sad",
      ];
      const emotionName = emotionNames[index] || `emoji_${index + 1}`;

      // Base64 데이터에서 실제 이미지 데이터 추출
      const base64Data = src.includes(",") ? src.split(",")[1] : src;
      const mimeType = src.match(/data:([^;]+)/)?.[1] || "image/png";
      const extension = mimeType.split("/")[1] || "png";

      // 파일 다운로드
      const link = document.createElement("a");
      link.href = `data:${mimeType};base64,${base64Data}`;
      link.download = `${emotionName}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading emoji:", error);
      alert("이모티콘 다운로드 중 오류가 발생했습니다.");
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    console.error("Failed to load image for emoji:", index);
  };

  return (
    <div className="group relative aspect-square bg-slate-800 rounded-lg p-3 transition-all duration-300 hover:bg-slate-700 hover:scale-105 shadow-md">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      )}
      <img
        src={blobUrl || src}
        alt={`Generated Emoji ${index + 1}`}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <button
        onClick={handleDownload}
        className="absolute bottom-2 right-2 bg-cyan-500/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label="Download Emoji"
        title="개별 다운로드"
      >
        <DownloadIcon />
      </button>
    </div>
  );
};
