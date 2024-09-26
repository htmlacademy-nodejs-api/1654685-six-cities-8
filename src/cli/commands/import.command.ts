import path from 'node:path';
import { readFileSync } from 'node:fs';
import { Command, Logger } from '@/cli/index.js';
import { TSVOfferFileReader } from '@/shared/libs/index.js';
import { END_EVENT_NAME, LINE_END_EVENT_NAME } from '@/constants/index.js';
import { declination } from '@/shared/helpers/index.js';
import chalk from 'chalk';
import { Offer } from '@/shared/types/index.js';

export class ImportCommand implements Command {
  readonly name = '--import';
  readonly alias = '-i';
  readonly description = 'Импортирует данные из TSV файла';
  readonly params = ['path'];

  private import(filePath: string): string {
    const fullPath = path.join(process.cwd(), filePath.trim());
    const fileReader = new TSVOfferFileReader(fullPath);

    fileReader.on(LINE_END_EVENT_NAME, (offer: Offer, index) => {
      Logger.data(`\nИмпортирована ${chalk.bold.magenta(`${index}-ая`)} строка:`, offer);
    });
    fileReader.on(END_EVENT_NAME, (count: number) => {
      Logger.info(
        `\nИмпортировано **${count} ${declination(count, ['строка', 'строки', 'строк'])}**`
      );
    });

    try {
      fileReader.read();
    } catch (error: unknown) {
      Logger.error(error, 'Непредвиденная ошибка при чтении файла');
    }

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
