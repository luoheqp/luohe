#! /usr/bin/env node
import { program } from 'commander';
import * as install from './commands/install.mjs';

program.version('0.0.1').description('husky');

program.command('install [name]').alias('i').description('init judgement').action(install);

program.parse(process.argv);
