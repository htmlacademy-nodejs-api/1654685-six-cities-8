export type CommandInfo = {
  name: string;
  description: string;
  pattern: string;
  alias?: string;
  params?: string[];
};

export abstract class Command {
  /** @example --help */
  abstract readonly name: string;

  /** Описание */
  abstract readonly description: string;

  /** Псевдоним команды
   * @example -h */
  readonly alias?: string;

  /** Описание */
  readonly params?: string[];

  /** Получить данные о команде */
  get info(): CommandInfo {
    const result: CommandInfo = {
      name: this.name,
      description: this.description,
      pattern: this.name,
    };

    if (this.alias) {
      result.alias = this.alias;
    }

    if (this.params) {
      result.params = this.params;
      result.pattern = `${this.name} ${this.params.map((param) => `<${param}>`).join(' ')}`;
    }

    return result;
  }

  /** Запуск команды
   * @param args Аргументы
   * @param commands Список доступных команд */
  abstract run(args: string[], commands: CommandInfo[]): Promise<void>;
}
