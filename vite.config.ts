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
  };
});
