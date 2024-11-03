import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import nextNext from "@next/eslint-plugin-next";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import path from "node:path";

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
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:jsx-a11y/recommended",
    "plugin:@next/next/recommended"
  ),
  {
    plugins: {
      "@next/next": nextNext,
      "jsx-a11y": eslintPluginJsxA11y
    },

    languageOptions: {
      globals: {}
    },

    rules: {
      "react-hooks/exhaustive-deps": 0,
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
      ],
      "no-duplicate-imports": "error",
      "@typescript-eslint/no-require-imports": 0
    }
  }
];

export default Configuration;
