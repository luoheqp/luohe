const { executor } = require('../utils/preCommit.mjs');

module.exports = {
  '*': [
    (files) => {
      executor(files);
    },
    'git add .',
  ],
  '*.{js,vue,jsx,tsx,mjs}': ['eslint --fix'],
  '*.{scss,sass,css,less}': ['prettier --write'],
};
