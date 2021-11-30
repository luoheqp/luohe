export const lintStagedConfig =
  "module.exports = {\n" +
  "  '*.{js,vue,jsx,tsx}': ['eslint --fix'],\n" +
  "  '*.{scss,sass,css,less}': ['prettier --write']\n" +
  "};\n";

export const commitLintConfig = 
  "module.exports = {\n" +
  "  extends: ['@commitlint/config-conventional'],\n" +
  "};\n";
