#! /usr/bin/env node
import { program } from 'commander'

program.version("0.0.1").description("husky");

program
  .command("install [name]", "install one or more packages", { executableFile: "./commands/install.mjs" })
  .alias("i");

program.parse(process.argv);
