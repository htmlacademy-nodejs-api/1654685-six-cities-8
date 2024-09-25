import { Command, CommandInfo, Logger } from '@/cli/index.js';

export class HelpCommand implements Command {
  readonly name = '--help';
  readonly alias = '-h';
  readonly description = 'Выводит справочную информацию';

  /** Получить пример вызова
   * @example --command <param_1> <param_2> */
  private getPattern(command: CommandInfo) {
    return command.params
      ? `${command.name} ${command.params.map((param) => `<${param}>`).join(' ')}`
      : command.name;
  }

  public async execute(_args: string[], commands: CommandInfo[]) {
    const cmds = commands.map((command) => ({
      ...command,
      pattern: this.getPattern(command),
    }));

    Logger.info(
      'Подготовка данных для REST API сервера.\nПример: {main.js --<command> [--arguments]}'
    );
    Logger.info('\nДоступные команды:');

    const maxCommandLength = cmds.reduce(
      (prev, value) => (prev > value.pattern.length ? prev : value.pattern.length),
      0
    );

    cmds.forEach((command) => {
      Logger.info(
        ` **${command.pattern}**${''.padEnd(
          maxCommandLength - command.pattern.length,
          ' '
        )} # ${command.description}`
      );
    });
  }
}
