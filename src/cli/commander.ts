import { parseArgv } from "@/cli/utils/parser.js";
import { Abstract, Logger } from './index.js';

export class Commander {
  private commandMap: Record<string, Abstract> = {};
  private commandNameMap: Record<string, string> = {};
  private defaultCommand: string = '';

  constructor(defaultCommand: string) {
    this.defaultCommand = defaultCommand
  }

  public get commands() {
    return Object.keys(this.commandMap).map((key) => this.commandMap[key].info)
  }

  public register(commands: Abstract[]) {
    commands.forEach((command) => {
      this.commandMap[command.name] = command;

      if (command.alias) {
        this.commandNameMap[command.alias] = command.name
      }
    });
  }

  public async run(argv: string[], commands?: Abstract[]) {
    if (commands?.length) {
      this.register(commands)
    }

    parseArgv(argv).forEach(([name, args]) => {
      const command = this.commandMap[name] || this.commandMap[this.commandNameMap[name]];

      if (!command) {
        Logger.warning('Abstract not found.')
      }

      ;(command ? command : this.commandMap[this.defaultCommand]).run(args, this.commands);
    })
  }
}
