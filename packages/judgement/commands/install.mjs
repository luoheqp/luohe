#! /usr/bin/env node
import path from "path";
import { readFileSync } from "fs";

import { installPkg } from "../utils/pkgManager.mjs";
import { initialHusky } from "../utils/husky.mjs";

const __dirname = path.resolve();

// move pkg config to global
const pkgConfig = JSON.parse(readFileSync(`${__dirname}/package.json`));
global.__pkgConfig = {
  private: pkgConfig.private,
};

// install husky
await installPkg("husky", true);

// init husky config
await initialHusky();
