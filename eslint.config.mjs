import nextNext from "@next/eslint-plugin-next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const Configuration = [
  {
    ignores: ["**/dist", "**/node_modules", "**/.next"]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "@next/next": nextNext
    },

    languageOptions: {
      globals: {}
    },

    rules: {
      "react-hooks/exhaustive-deps": 0,

      "no-console": [
        "error",
        {
          allow: ["warn", "error"]
        }
      ],

      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_"
        }
      ]
    }
  }
];

export default Configuration;
