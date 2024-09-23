import chalk from "chalk";

const BRACES_REGEX = /{([a-zA-Z0-9А-Яа-я_()\]\[<>\-. ]+)}/gm
const ASTERISKS_REGEX = /\*\*([a-zA-Z0-9А-Яа-я_()\]\[<>\-. ]+)\*\*/gm
const UNDERLINE_REGEX = /__([a-zA-Z0-9А-Яа-я_()\]\[<>\-. ]+)__/gm

export class Logger {
  private static getStyledText(message: string) {
    return message
      .replaceAll(BRACES_REGEX, chalk.green('$1'))
      .replaceAll(ASTERISKS_REGEX, chalk.bold.green('$1'))
      .replaceAll(UNDERLINE_REGEX, chalk.underline('$1'));
  }

  public static info(...attrs: string[]) {
    console.log(...attrs.map(attr => this.getStyledText(attr)))
  }

  public static success(...attrs: any) {
    console.log(chalk.green(...attrs));
  }

  public static warning = (...attrs: string[]) => {
    console.warn(...attrs.map(attr => this.getStyledText(attr)))
  }

  public static error = (error: unknown, message?: string) => {
    console.error(error instanceof Error || typeof error === 'string' ? error : message);
  }
}
