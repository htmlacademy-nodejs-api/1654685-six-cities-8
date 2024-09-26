import got from 'got';
import { Command, Logger } from '@/cli/index.js';
import { MockServerData } from '@/shared/types/index.js';
import { TSVOfferGenerator, TSVFileWriter } from '@/shared/libs/index.js';

const FILE_NAME_REGEX = /^.*?([^\\/]*)$/;

export class GenerateCommand implements Command {
  readonly name = '--generate';
  readonly alias = '-g';
  readonly description = 'Генерирует произвольное количество тестовых данных';
  readonly params = ['n', 'filepath', 'url'];

  private initialData!: MockServerData;

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
      Logger.error(`Заданы не все параметры!`);
      return;
    }

    try {
      await this.load(url);
      await this.write(filepath, count);

      Logger.success(`Файл **${filepath.replace(FILE_NAME_REGEX, '$1')}** — создан!`);
    } catch (error: unknown) {
      Logger.error(
        error,
        `Не удалось создать файл с указанными параметрами (${countString}, ${filepath}, ${url})`
      );
    }
  }
}
