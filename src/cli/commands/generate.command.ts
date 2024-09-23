import { Command, Logger } from '@/cli/index.js';

export class GenerateCommand extends Command {
  readonly name = '--generate';
  readonly alias = '-g';
  readonly description = 'Generate data';
  readonly params = ['n', 'filepath', 'url'];

  public async run(params: string[]) {
    try {
      Logger.warning('In development... 😊');
    } catch (error: unknown) {
      Logger.error(error, `Failed to create file with specified parameters (${params})`);
    }
  }
}
