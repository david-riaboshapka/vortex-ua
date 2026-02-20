import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals.js";

const eslintConfig = defineConfig({
  extends: [nextVitals], // <-- просто передаём как массив, не spread
  ignorePatterns: [
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
});

export default eslintConfig;