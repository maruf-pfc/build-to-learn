// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["node_modules/*", "src/generated"]),
]);
