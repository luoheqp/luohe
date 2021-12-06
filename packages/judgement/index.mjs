#! /usr/bin/env node
import { program } from 'commander';
import * as install from './commands/install.mjs';

program.version('0.0.1').description('husky');

program
  .command('install [name]', 'install one or more packages', { executableFile: install })
  .alias('i');

program.parse(process.argv);
