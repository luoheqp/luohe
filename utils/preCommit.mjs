import { readSync } from 'fs';
import { parse, resolve } from 'path';

import { checkFileExist } from './files.mjs';

const __dirname = resolve();

const executor = (files) => {
  let packagesList = {};

  files.forEach((file) => {
    const pkgName = parseFilePath(file);

    if (!pkgName && !packagesList[pkgName]) return;

    if (!packagesList[pkgName]) packagesList[pkgName] = true;

    detectOrder(pkgName);
  });
};

const parseFilePath = (filePath) => {
  const { dir } = parse(filePath);
  const dirReg = /\/packages\/(\S+)[\/]?/;
  const [, pkgName] = dir.match(dirReg);

  return pkgName;
};

const detectOrder = (pkgName) => {
  const fullPath = path.resolve(__dirname, `./${pkgName}/package.json`);

  if (!checkFileExist(fullPath)) return false;

  let pkgJson = readSync(`${__dirname}/package.json`);
  pkgJson = JSON.parse(pkgJson);

  if (!pkgJson?.script?.['pre-commit']) return false;
};

module.exports = { executor };
