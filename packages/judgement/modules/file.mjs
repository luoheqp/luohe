import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const __dirname = path.resolve();

export const checkFileExist = (filePath) => {
  return existsSync(path.resolve(__dirname, filePath));
};

export const mkdir = (dirPath) => {
  return mkdirSync(path.resolve(__dirname, dirPath));
};
