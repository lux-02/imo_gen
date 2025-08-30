import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  return {
    define: {
      "process.env.VITE_GEMINI_API_KEY": JSON.stringify(
        env.VITE_GEMINI_API_KEY
      ),
      "process.env.API_KEY": JSON.stringify(env.VITE_GEMINI_API_KEY), // 호환성을 위해
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      port: 5173,
      host: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      // 431 에러 방지를 위한 설정
      maxHeaderSize: 65536, // 64KB로 증가
      // 큰 파일 처리 개선
      fs: {
        strict: false,
        allow: [".."],
      },
      // 메모리 제한 증가
      hmr: {
        overlay: false, // HMR 오버레이 비활성화로 메모리 절약
      },
    },
    // 빌드 최적화
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            utils: ["jszip"],
          },
        },
      },
      // 청크 크기 제한
      chunkSizeWarningLimit: 1000,
    },
    // 개발 환경 최적화
    optimizeDeps: {
      include: ["react", "react-dom", "jszip"],
    },
  };
});
