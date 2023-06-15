module.exports = {
  root: true,
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  settings: {
    node: {
      tryExtensions: [".js", ".json", ".node", ".ts", ".d.ts"],
      allowModules: ["ethers", "ttt-ts-bindings"],
    },
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
};
