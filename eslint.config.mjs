import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: {
      "no-console": "off", // biar console.log gak dianggap error
      "func-names": "off", // biar middleware boleh function tanpa nama
      "class-methods-use-this": "off", // kalau kamu bikin class controller
      "no-underscore-dangle": "off", // biar gak error kalau pakai _id (misal MongoDB)
      "no-var": "error", // wajib pakai let/const, bukan var
      "prefer-const": "warn", // sarankan pakai const kalau variabel tidak berubah
      eqeqeq: ["error", "always"], // pakai ===, bukan ==
      "no-multiple-empty-lines": ["warn", { max: 1 }], // cegah banyak baris kosong
      "object-curly-spacing": ["error", "always"], // konsisten spasi di object { key: value }
    },
  },
]);
