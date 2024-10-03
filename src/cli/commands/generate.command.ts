import { Command, Logger } from '@/cli/index.js';

export class GenerateCommand implements Command {
  readonly name = '--generate';
  readonly alias = '-g';
  readonly description = 'Генерирует произвольное количество тестовых данных';
  readonly params = ['n', 'filepath', 'url'];

  public async execute(params: string[]) {
    try {
      Logger.warning('В разработке... 😊');
    } catch (error: unknown) {
      Logger.error(error, `Не удалось создать файл с указанными параметрами (${params})`);
    }
  }
}
