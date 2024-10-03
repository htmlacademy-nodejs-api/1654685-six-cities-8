import path from 'node:path';
import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { declination, getFileName } from '../../shared/helpers/index.js';
import { EventName } from '../../constants/index.js';
import { TSVOfferFileReader } from '../../shared/libs/index.js';
import { Command, CliLogger } from '../../cli/index.js';
import { Offer } from '../../shared/types/index.js';

const LINE_WORDS = ['строка', 'строки', 'строк'];

export class ImportCommand implements Command {
  readonly name = '--import';
  readonly alias = '-i';
  readonly description = 'Импортирует данные из TSV файла';
  readonly params = ['path'];

  private onReadLine(offer: Offer, index: number) {
    CliLogger.data(`\nИмпортирована ${chalk.bold.magenta(`${index}-ая`)} строка:`, offer);
  }

  private onReadFile(count: number) {
    CliLogger.info(`\nИмпортировано **${count} ${declination(count, LINE_WORDS)}**`);
  }

  private import(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath.trim());
    const isFileExists = existsSync(fullPath);

    if (!isFileExists) {
      throw new Error(`Файл **${getFileName(filePath)}** — не существует!`);
    }

    const fileReader = new TSVOfferFileReader(fullPath);

    fileReader.on(EventName.LINE_READ, this.onReadLine);
    fileReader.on(EventName.FILE_READ, this.onReadFile);

    fileReader.read();
  }

  public async execute([filePath]: string[]) {
    if (!filePath) {
      CliLogger.error('⚠️ Укажите путь к файлу!');
      return;
    }

    try {
      this.import(filePath);
    } catch (error: unknown) {
      CliLogger.error(error, `Не удалось загрузить файл с указанием пути: ${filePath}`);
    }
  }
}
