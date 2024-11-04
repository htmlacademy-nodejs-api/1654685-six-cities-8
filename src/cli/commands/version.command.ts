import { readFileSync } from 'node:fs';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { Command } from '../../cli/index.js';

export class VersionCommand implements Command {
  readonly name = '--version';
  readonly alias = '-v';
  readonly description = 'Выводит номер версии';

  private readonly logger: Logger = new ConsoleLogger();

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
      this.logger.info(`Версия: **${this.getVersion()}**`);
    } catch (error: unknown) {
      this.logger.error(error, 'Не удалось прочитать версию пакета');
    }
  }
}
