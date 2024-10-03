import { readFileSync } from 'node:fs';
import { Command, CliLogger } from '../../cli/index.js';

export class VersionCommand implements Command {
  readonly name = '--version';
  readonly alias = '-v';
  readonly description = 'Выводит номер версии';

  private getVersion(): string {
    if (process.env?.npm_package_version) {
      return process.env.npm_package_version;
    }

    if (!process.env?.npm_package_json) {
      throw new Error('Ошибка при чтении `package.json`');
    }

    const data = JSON.parse(readFileSync(process.env.npm_package_json, { encoding: 'utf8' }));

    if (!data?.version) {
      throw new Error('Ошибка при чтении свойства `version`');
    }

    return data.version;
  }

  public async execute(): Promise<void> {
    try {
      CliLogger.info(`Версия: **${this.getVersion()}**`);
    } catch (error: unknown) {
      CliLogger.error(error, 'Не удалось прочитать версию пакета');
    }
  }
}
