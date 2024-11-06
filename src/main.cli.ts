#!/usr/bin/env node
import 'reflect-metadata';

import {
  CliApplication,
  HelpCommand,
  ImportCommand,
  VersionCommand,
  GenerateCommand,
} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CliApplication('--help');

  cliApplication.processCommand(process.argv, [
    new VersionCommand(),
    new HelpCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
}

bootstrap();
