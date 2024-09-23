#!/usr/bin/env node

import {
  Commander,
  HelpCommand,
  VersionCommand,
  ImportCommand,
  GenerateCommand,
} from '@/cli/index.js';

new Commander('--help').run(process.argv, [
  new VersionCommand(),
  new HelpCommand(),
  new ImportCommand(),
  new GenerateCommand(),
]);
