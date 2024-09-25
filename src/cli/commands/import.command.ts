import path from 'node:path';
import { readFileSync } from 'node:fs';
import { Command, Logger } from '@/cli/index.js';

export class ImportCommand implements Command {
  readonly name = '--import';
  readonly alias = '-i';
  readonly description = 'Импортирует данные из TSV файла';
  readonly params = ['path'];

  private import(filePath: string): string {
    const fullPath = path.join(process.cwd(), filePath);

    return readFileSync(fullPath, { encoding: 'utf8' });
  }

  public async execute([filePath, ...args]: string[]) {
    if (!filePath) {
      Logger.error(`${filePath} — Неверный путь к файлу!`);
      return;
    }

    if (args.length) {
      Logger.warning('⚠️ Слишком много аргументов для команды');
    }

    try {
      Logger.info(this.import(filePath));
    } catch (error: unknown) {
      Logger.error(error, `Не удалось загрузить файл с указанием пути: ${filePath}`);
    }
  }
}
