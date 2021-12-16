#! /usr/bin/env node
import { execSync } from 'child_process';
import { readFile } from 'fs/promises';
import path from 'path';

import ora from 'ora';

const __dirname = path.resolve();

export const getPkgConfig = async () => {
  if (!global.__pkgConfig) {
    const pkgJson = await readFile(`${__dirname}/package.json`);
    const { devDependencies = {}, dependencies = {}, ...otherConfig } = JSON.parse(pkgJson);

    global.__pkgConfig = {
      isPrivate: otherConfig.private,
      devDependencies,
      dependencies,
    };
  }

  return global.__pkgConfig;
};

// check yarn
export const checkPkgManager = async () => {
  if (typeof global.__pkgManager === 'string') {
    return global.__pkgManager;
  }

  try {
    execSync('yarn -v');
    global.__pkgManager = 'yarn';
  } catch {
    global.__pkgManager = 'npm';
  } finally {
    return global.__pkgManager;
  }
};

// install package
export const installPkg = async (pkgName, d = false) => {
  let installList = '';
  let __pkgManager = await checkPkgManager();
  let { isPrivate: pkgPrivite } = await getPkgConfig();

  if (Array.isArray(pkgName)) {
    installList = pkgName.join(' ');
  } else {
    installList = pkgName;
  }

  let spinner = ora(`installing ${installList}`);

  spinner.start();
  try {
    execSync(`${__pkgManager} add ${installList} ${d ? '-D' : ''} ${pkgPrivite ? '-W' : ''}`);
    spinner.succeed(`install ${installList} success`);
  } catch {
    spinner.fail(`install ${installList} fail`);
    throw new Error('utils/installPkg error');
  } finally {
    spinner.stop();
  }
};

// check lib exist
export const checkLibExist = async (libName) => {
  const { devDependencies, dependencies } = await getPkgConfig();
  const deps = [...Object.keys(devDependencies), ...Object.keys(dependencies)];

  return Boolean(deps.find((name) => name === libName));
};
