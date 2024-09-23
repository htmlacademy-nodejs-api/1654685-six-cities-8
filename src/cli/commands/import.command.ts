import path from 'node:path';
import { readFileSync } from 'node:fs';
import { Command, Logger } from '@/cli/index.js';

export class ImportCommand extends Command {
  readonly name = '--import';
  readonly alias = '-i';
  readonly description = 'Import TSV file';

  private import(filePath: string): string {
    const fullPath = path.join(process.cwd(), filePath);

    return readFileSync(fullPath, { encoding: 'utf8' });
  }

  public async run([filePath, ...args]: string[]) {
    if (!filePath) {
      Logger.error(`${filePath} — Invalid file path!`);
      return;
    }

    if (args.length) {
      Logger.warning('⚠️ Too many arguments for the command');
    }

    try {
      Logger.info(this.import(filePath));
    } catch (error: unknown) {
      Logger.error(error, `Failed to load file with path: ${filePath}`);
    }
  }
}
