import { CommandInfo } from '@/cli/index.js';

export interface Command {
  /** @example --help */
  readonly name: string;
  readonly description: string;

  /** Псевдоним команды
   * @example -h */
  readonly alias?: string;

  /** Параметры команды */
  readonly params?: string[];

  /** @param args Аргументы
   * @param commands Список доступных команд */
  execute(args: string[], commands: CommandInfo[]): Promise<void>;
}
