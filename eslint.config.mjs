import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Qaydaları tətbiq etmək istədiyiniz fayl tiplərini seçin
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // "any" istifadəsini qadağan edir
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // Ignore ediləcək qovluqlar
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;