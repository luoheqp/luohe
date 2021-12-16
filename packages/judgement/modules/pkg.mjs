#! /usr/bin/env node
import { exec } from 'child_process';

import ora from 'ora';

// check yarn
export const checkPkgManager = async () => {
  if (typeof global.__pkgManager === 'string') {
    return global.__pkgManager;
  }

  try {
    await exec('yarn -v');
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
  let { private: pkgPrivite } = global.__pkgConfig;

  if (Array.isArray(pkgName)) {
    installList = pkgName.join(' ');
  } else {
    installList = pkgName;
  }

  let spinner = ora(`installing ${installList}`);
  
  spinner.start();
  try {
    await exec(`${__pkgManager} add ${installList} ${d ? '-D' : ''} ${pkgPrivite ? '-W' : ''}`);
    spinner.succeed(`install ${installList} success`);
  } catch {
    spinner.fail(`install ${installList} fail`);
    throw new Error('utils/installPkg error');
  } finally {
    spinner.stop();
  }
};
