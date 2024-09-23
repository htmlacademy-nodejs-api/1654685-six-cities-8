import { parseArgv } from '@/cli/utils/parser.js';
import { Command, Logger } from './index.js';

export class Commander {
  private commandMap: Record<string, Command> = {};
  private commandNameMap: Record<string, string> = {};

  private readonly defaultCommand: string = '';

  constructor(defaultCommand: string) {
    this.defaultCommand = defaultCommand;
  }

  public get commands() {
    return Object.keys(this.commandMap).map((key) => this.commandMap[key].info);
  }

  public register(commands: Command[]) {
    commands.forEach((command) => {
      this.commandMap[command.name] = command;

      if (command.alias) {
        this.commandNameMap[command.alias] = command.name;
      }
    });
  }

  public async run(argv: string[], commands?: Command[]) {
    if (commands?.length) {
      this.register(commands);
    }

    parseArgv(argv).forEach(([name, args]) => {
      const command = this.commandMap[name] || this.commandMap[this.commandNameMap[name]];

      if (!command) {
        Logger.warning(
          `⚠️ Команда не найдена! ${this.defaultCommand ? `Запущена команда {${this.defaultCommand}}:\n` : ''}`
        );
      }

      (command ? command : this.commandMap[this.defaultCommand])?.run(args, this.commands);
    });
  }
}
