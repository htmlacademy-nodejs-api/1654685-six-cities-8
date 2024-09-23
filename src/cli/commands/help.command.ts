import { Abstract, CommandInfo, Logger } from '@/cli/index.js';

export class HelpCommand extends Abstract {
  readonly name = '--help';
  readonly alias = '-h';
  readonly description = 'Get help';

  public async run(_args: string[], commands: CommandInfo[]) {
    Logger.info('Подготовка данных для сервера REST API.\n' + 'Пример: {--<command> [--arguments]}');
    Logger.info('\nДоступные команды:');

    const maxCommandLength = commands.reduce((prev, value) => prev > value.pattern.length ? prev : value.pattern.length, 0);

    commands.forEach(command => {
      Logger.info(` **${command.pattern}**` + ''.padEnd(maxCommandLength - command.pattern.length, ' ') + ` # ${command.description}`);
    })
  }
}
