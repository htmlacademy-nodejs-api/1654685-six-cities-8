#!/usr/bin/env node

import {
  CliApplication,
  HelpCommand,
  VersionCommand,
  ImportCommand,
  GenerateCommand,
} from './cli/index.js';

new CliApplication('--help').processCommand(process.argv, [
  new VersionCommand(),
  new HelpCommand(),
  new ImportCommand(),
  new GenerateCommand(),
]);
