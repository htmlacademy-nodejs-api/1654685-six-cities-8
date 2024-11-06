import { Command, CommandInfo } from '../../cli/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/index.js';

export class HelpCommand implements Command {
  readonly name = '--help';
  readonly alias = '-h';
  readonly description = 'Выводит справочную информацию';

  private readonly logger: Logger = new ConsoleLogger();

  /** Получить пример вызова
   * @example --command <param_1> <param_2> */
  private getPattern(command: CommandInfo) {
    return command.params
      ? `${command.name} ${command.params.map((param) => `<${param}>`).join(' ')}`
      : command.name;
  }

  public async execute(_args: string[], commands: CommandInfo[]) {
    const list = commands.map((command) => ({ ...command, pattern: this.getPattern(command) }));

    this.logger.info(
      'Подготовка данных для REST API сервера.\nПример: {main.js --<command> [--arguments]}'
    );
    this.logger.info('\nДоступные команды:');

    const maxCommandLength = list.reduce(
      (prev, value) => (prev > value.pattern.length ? prev : value.pattern.length),
      0
    );

    list.forEach((command) => {
      this.logger.info(
        ` **${command.pattern}**${''.padEnd(
          maxCommandLength - command.pattern.length,
          ' '
        )} # ${command.description}`
      );
    });
  }
}
