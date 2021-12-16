#! /usr/bin/env node
import { exit } from 'process';

import chalk from 'chalk';

import { installPkg } from '../modules/pkg.mjs';
import { initialHusky } from '../modules/husky.mjs';
import { initialPrettier } from '../modules/prettier.mjs';
import { checkFileExist } from '../modules/file.mjs';

// check is git init
if (!checkFileExist('./.git')) {
  console.error(chalk.red('Please init git first'));
  exit(1);
}

// check is lib init
if (!checkFileExist('./package.json')) {
  console.error(chalk.red('Please use yarn or npm to init repo first'));
  exit(1);
}

// init prettier
await initialPrettier();

// install husky
await installPkg('husky', true);

// init husky config
await initialHusky();

console.log(chalk.greenBright('Judgement is ready!'));
