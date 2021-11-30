import { exec, execSync } from "child_process";
import { writeFileSync } from "fs";

import inquirer from "inquirer";

import { installPkg } from "./pkg.mjs";
import { commitMsg, commitMsgSign, preCommit, preCommitSign } from "../templates/shell.mjs";
import { lintStagedConfig, commitLintConfig } from "../templates/config.mjs";

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

  execSync(`npx husky install ${huskyPath}`);
  await initGitHook();
};

const initGitHook = async () => {
  await initPreCommit();
  await initCommitMsg();
};

const initPreCommit = async () => {
  const { __huskyPath, __configPath } = global;

  await installPkg("lint-staged", true);
  execSync(`npx husky add ${__huskyPath}/pre-commit`);

  // 写入 pre-commit hook 内容以及 lint-staged 配置内容
  const dealedPreCommit = preCommit.replace(preCommitSign, __configPath);
  execSync(`touch ${__huskyPath}/pre-commit`);
  writeFileSync(`${__huskyPath}/pre-commit`, dealedPreCommit);
  writeFileSync(`${__configPath}/lint-staged.config.js`, lintStagedConfig);
};

const initCommitMsg = async () => {
  const { __huskyPath, __configPath } = global;

  await installPkg(["@commitlint/cli", "@commitlint/config-conventional"], true);
  execSync(`npx husky add ${__huskyPath}/commit-msg`);

  const dealedCommitMsg = commitMsg.replace(commitMsgSign, __configPath);
  execSync(`touch ${__huskyPath}/commit-msg`);
  writeFileSync(`${__huskyPath}/commit-msg`, dealedCommitMsg);
  writeFileSync(`${__configPath}/commitlint.config.js`, commitLintConfig);
};
