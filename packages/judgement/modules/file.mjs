import { existsSync, mkdirSync } from 'fs';
import path from 'path';

import { cosmiconfig } from 'cosmiconfig';

const __dirname = path.resolve();

export const checkFileExist = (filePath) => {
  return existsSync(path.resolve(__dirname, filePath));
};

export const mkdir = (dirPath) => {
  return mkdirSync(path.resolve(__dirname, dirPath));
};

export const findConfig = async (module) => {
  if (!module) return {};

  const explorer = cosmiconfig(module);
  const { config, filepath } = await explorer.search() || {};

  return { config, filepath };
};
