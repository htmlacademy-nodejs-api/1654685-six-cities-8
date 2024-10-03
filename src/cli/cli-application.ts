import { parseArgv } from './utils/parser.js';
import { Command, CliLogger } from './index.js';

export type CommandInfo = { name: string; description: string; params?: string[] };

export class CliApplication {
  private commandMap: Record<string, Command> = {};
  private commandAliasMap: Record<string, string> = {};

  private readonly defaultCommand: string = '';

  constructor(defaultCommand: string) {
    this.defaultCommand = defaultCommand;
  }

  /** Получить данные о команде */
  private getCmdInfo(command: Command) {
    const result: CommandInfo = { name: command.name, description: command.description };

    if (command.params) {
      result.params = command.params;
    }

    return result;
  }

  public get commands() {
    return Object.keys(this.commandMap).map((key) => this.getCmdInfo(this.commandMap[key]));
  }

  public register(commands: Command[]) {
    commands.forEach((command) => {
      this.commandMap[command.name] = command;

      if (command.alias) {
        this.commandAliasMap[command.alias] = command.name;
      }
    });
  }

  public async processCommand(argv: string[], commands?: Command[]) {
    if (commands?.length) {
      this.register(commands);
    }

    parseArgv(argv).forEach(([name, args]) => {
      const command = this.commandMap[name] || this.commandMap[this.commandAliasMap[name]];

      if (!command) {
        CliLogger.warning(
          `⚠️ Команда не найдена! ${this.defaultCommand ? `Запущена команда {${this.defaultCommand}}:\n` : ''}`
        );
      }

      (command ? command : this.commandMap[this.defaultCommand])?.execute(args, this.commands);
    });
  }
}
