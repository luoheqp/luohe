export const lintStagedConfig =
  'module.exports = {\n' +
  '  "*.{js,css,html}": ["prettier --write"],\n' +
  '};\n';

export const commitLintConfig =
  'module.exports = {\n' + '  extends: [\'@commitlint/config-conventional\'],\n' + '};\n';
