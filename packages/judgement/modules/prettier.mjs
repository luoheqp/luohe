import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { writeFileSync } from 'fs';

import { checkLibExist, installPkg } from './pkg.mjs';
import { findConfig } from './file.mjs';
import { JSON_TYPE } from '../templates/prettierrc.mjs';
import path from 'path';

const __dirname = path.resolve();

export const initialPrettier = async () => {
  // 检测 prettier 配置以及 prettier 是否安装
  const prettierFlag = await checkLibExist('prettier');

  if (!prettierFlag) await askPrettier();
};

const askPrettier = async () => {
  const { ans } = await inquirer.prompt({
    type: 'boolean',
    name: 'ans',
    message: 'not found prettier, install it?',
    default() {
      return true;
    },
  });

  ans && installPrettier();
};

const installPrettier = async () => {
  await installPkg('prettier', true);

  // 查询是否有配置文件存在
  const { filepath } = findConfig('prettier');
  if (!filepath) pastNewConfig();
};

const pastNewConfig = async (type = 'json') => {
  if (type === 'json') {
    execSync('touch ./prettierrc.json');
    writeFileSync(path.resolve(__dirname, './.prettierrc.json'), JSON_TYPE);
  }
};
