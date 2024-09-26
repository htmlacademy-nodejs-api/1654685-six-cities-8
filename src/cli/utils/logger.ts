import chalk from 'chalk';
import { ChalkColorMethod } from '@/shared/types/index.js';

const BRACES_REGEX = /{([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)}/gm;
const ASTERISKS_REGEX = /\*\*([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)\*\*/gm;
const UNDERLINE_REGEX = /__([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)__/gm;

export class Logger {
  private static getStyledText(message: string, color: ChalkColorMethod = 'green') {
    return message
      .replaceAll(BRACES_REGEX, chalk[color]('$1'))
      .replaceAll(ASTERISKS_REGEX, chalk.bold[color]('$1'))
      .replaceAll(UNDERLINE_REGEX, chalk.underline('$1'));
  }

  public static data(...attrs: unknown[]) {
    console.log(...attrs);
  }

  public static info(...attrs: string[]) {
    console.log(...attrs.map((attr) => this.getStyledText(attr)));
  }

  public static success(...attrs: string[]) {
    console.log(chalk.green(...attrs.map((attr) => this.getStyledText(attr, 'greenBright'))));
  }

  public static warning = (...attrs: string[]) => {
    console.warn(chalk.yellow(...attrs.map((attr) => this.getStyledText(attr, 'whiteBright'))));
  };

  public static error = (error: unknown, defaultMessage = 'Произошла непредвиденная ошибка') => {
    const resultMessage = error instanceof Error ? error.message : error;

    console.error(
      chalk.red(
        this.getStyledText(
          typeof resultMessage === 'string' ? resultMessage : defaultMessage,
          'whiteBright'
        )
      )
    );
  };
}
