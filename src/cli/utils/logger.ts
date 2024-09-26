import chalk from 'chalk';

const BRACES_REGEX = /{([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)}/gm;
const ASTERISKS_REGEX = /\*\*([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)\*\*/gm;
const UNDERLINE_REGEX = /__([a-zA-Z0-9А-Яа-я_()[\]<>\-.:/ ]+)__/gm;

export class Logger {
  private static getStyledText(message: string) {
    return message
      .replaceAll(BRACES_REGEX, chalk.green('$1'))
      .replaceAll(ASTERISKS_REGEX, chalk.bold.green('$1'))
      .replaceAll(UNDERLINE_REGEX, chalk.underline('$1'));
  }

  public static data(...attrs: unknown[]) {
    console.log(...attrs);
  }

  public static info(...attrs: string[]) {
    console.log(...attrs.map((attr) => this.getStyledText(attr)));
  }

  public static success(...attrs: string[]) {
    console.log(chalk.green(...attrs.map((attr) => this.getStyledText(attr))));
  }

  public static warning = (...attrs: string[]) => {
    console.warn(chalk.yellow(...attrs.map((attr) => this.getStyledText(attr))));
  };

  public static error = (error: unknown, defaultMessage = 'Произошла непредвиденная ошибка') => {
    const resultMessage = error instanceof Error ? error.message : error;

    console.error(
      chalk.red(
        this.getStyledText(typeof resultMessage === 'string' ? resultMessage : defaultMessage)
      )
    );
  };
}
