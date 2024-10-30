import got from 'got';
import { getFileName } from '../../shared/helpers/index.js';
import { TSVOfferGenerator, TSVFileWriter } from '../../shared/libs/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { MockServerData } from '../../shared/types/index.js';
import { Command } from '../../cli/index.js';

export class GenerateCommand implements Command {
  readonly name = '--generate';
  readonly alias = '-g';
  readonly description = 'Генерирует произвольное количество тестовых данных';
  readonly params = ['n', 'filepath', 'url'];

  private readonly logger: Logger = new ConsoleLogger();
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Ошибка при загрузке данных из **${url}**`);
    }
  }

  private async write(filepath: string, count: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < count; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute([countString, filepath, url]: string[]) {
    const count = Number.parseInt(countString, 10);

    if (!countString || !filepath || !url) {
      this.logger.error(`Заданы не все параметры!`);
      return;
    }

    try {
      await this.load(url);
      await this.write(filepath, count);

      this.logger.success(`Файл **${getFileName(filepath)}** — создан!`);
    } catch (error: unknown) {
      this.logger.error(
        error,
        `Не удалось создать файл с указанными параметрами (${countString}, ${filepath}, ${url})`
      );
    }
  }
}
