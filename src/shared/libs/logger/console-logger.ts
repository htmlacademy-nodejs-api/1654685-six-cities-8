import chalk from 'chalk';
import { Logger } from './logger.interface.js';
import { DEFAULT_ERROR } from './logger.constant.js';
import { ChalkColorMethod } from '../../types/index.js';

const BRACES_REGEX = /{([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)}/gm;
const ASTERISKS_REGEX = /\*\*([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)\*\*/gm;
const UNDERLINE_REGEX = /__([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)__/gm;

export class ConsoleLogger implements Logger {
  private static stylizeMessage(data: unknown, color: ChalkColorMethod = 'green') {
    if (typeof data !== 'string') {
      return;
    }

    return data
      .replaceAll(BRACES_REGEX, chalk[color]('$1'))
      .replaceAll(ASTERISKS_REGEX, chalk.bold[color]('$1'))
      .replaceAll(UNDERLINE_REGEX, chalk.underline('$1'));
  }

  debug(message: string, ...args: unknown[]) {
    console.debug(ConsoleLogger.stylizeMessage(message), ...args);
  }

  info(message: string, ...args: unknown[]) {
    console.log(ConsoleLogger.stylizeMessage(message), ...args);
  }

  success(message: string, ...args: unknown[]) {
    console.log(chalk.green(ConsoleLogger.stylizeMessage(message, 'greenBright')), ...args);
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(chalk.yellow(ConsoleLogger.stylizeMessage(message, 'whiteBright')), ...args);
  }

  error(error: unknown, ...attrs: unknown[]) {
    const resultMessage = error instanceof Error ? error.message : error;

    console.error(
      chalk.red(ConsoleLogger.stylizeMessage(resultMessage || DEFAULT_ERROR, 'whiteBright')),
      ...attrs
    );
  }
}
