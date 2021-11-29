import { exec } from "child_process";
import { writeFileSync } from "fs";

import inquirer from "inquirer";
import { installPkg } from './pkgManager';

import { commitMsg, preCommit } from "../template/shell.mjs";

const DEFAULT_HUSKY_CONFIG_PATH = "./config/husky";

export const initialHusky = async () => {
  const { huskyPath } = await inquirer.prompt({
    type: "input",
    name: "huskyPath",
    message: `set your husky config path`,
    default() {
      return DEFAULT_HUSKY_CONFIG_PATH;
    },
  });
  let configPath = huskyPath.split("/");
  configPath.length--;
  configPath = configPath.join("/");

  global.__huskyPath = huskyPath;
  global.__configPath = configPath;

  await exec(`npx husky install ${huskyPath}`);
  await initGitHook();
};

const initGitHook = async () => {
  writeFileSync(`${global.__configPath}/commit-msg`, commitMsg);
  writeFileSync(`${global.__configPath}/pre-commit`, preCommit);
};

const initPreCommit = async () => {
  await installPkg('lint-staged', true);
};
