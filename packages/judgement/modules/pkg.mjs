#! /usr/bin/env node
import { exec } from "child_process";

// check yarn
export const checkPkgManager = async () => {
  if (typeof global.__pkgManager === "string") {
    return global.__pkgManager;
  }

  try {
    await exec("yarn -v");
    global.__pkgManager = "yarn";
  } catch {
    global.__pkgManager = "npm";
  } finally {
    return global.__pkgManager;
  }
};

// install package
export const installPkg = async (pkgName, d = false) => {
  let installList = "";
  let __pkgManager = await checkPkgManager();
  let { private: pkgPrivite } = global.__pkgConfig;

  if (Array.isArray(pkgName)) {
    installList = pkgName.join(" ");
  } else {
    installList = pkgName;
  }

  try {
    await exec(`${__pkgManager} add ${installList} ${d ? "-D" : ""} ${pkgPrivite ? "-W" : ""}`);
    console.log(`install ${installList} success!`);
  } catch {
    return new Error("utils/installPkg error");
  }
};
