/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  settings: {
    react: {
      version: "detect"
    }
  },
  ignorePatterns: ["dist/", "node_modules/", ".eslintrc.js"]
};
