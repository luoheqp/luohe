#! /usr/bin/env node
import path from "path";
import { readFileSync } from "fs";
import { exit } from "process";
import chalk from 'chalk';

import { installPkg } from "../modules/pkg.mjs";
import { initialHusky } from "../modules/husky.mjs";
import { checkFileExist } from "../modules/file.mjs";

const __dirname = path.resolve();

// check is git init
if (!checkFileExist("./.git")) {
  console.error(chalk.red("Please init git first"));
  exit(1)
}

// move pkg config to global
const pkgConfig = JSON.parse(readFileSync(`${__dirname}/package.json`));
global.__pkgConfig = {
  private: pkgConfig.private,
};

// install husky
await installPkg("husky", true);

// init husky config
await initialHusky();
