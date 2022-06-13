import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { writeFileSync } from 'fs';

import { checkLibExist, installPkg } from './pkg.mjs';
import { findConfig } from './file.mjs';
import { JSON_TYPE } from '../templates/prettierrc.mjs';
import path from 'path';

const __dirname = path.resolve();

export const initialPrettier = async () => {
  // NOTE: 检测 prettier 配置以及 prettier 是否安装
  const prettierFlag = await checkLibExist('prettier');
  if (!prettierFlag) {
    const ans = await askInstallPrettier();
    if (!ans) return;
  }

  const { filepath } = await findConfig('prettier');
  !filepath && await askCreateConfig();
};

// 安装 prettier
const askInstallPrettier = async () => {
  const { ans } = await inquirer.prompt({
    type: 'confirm',
    name: 'ans',
    message: 'not found prettier, install it?',
    default() {
      return true;
    },
  });

  ans && await installPkg('prettier', true);
  return ans;
};

// 配置 prettier config
const askCreateConfig = async () => {
  const { ans } = await inquirer.prompt({
    type: 'confirm',
    name: 'ans',
    message: 'not find prettier config, use judgement defualt?',
    default() {
      return true;
    },
  });

  if (!ans) return;

  writeFileSync(path.resolve(__dirname, './.prettierrc.json'), JSON_TYPE);
};
