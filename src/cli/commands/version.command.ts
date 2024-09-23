import { readFileSync } from 'node:fs';
import { Command, Logger } from '@/cli/index.js';

export class VersionCommand extends Command {
  readonly name = '--version';
  readonly alias = '-v';
  readonly description = 'Get package version';

  private getVersion(): string {
    if (process.env?.npm_package_version) {
      return process.env.npm_package_version;
    }

    if (!process.env?.npm_package_json) {
      throw new Error('Invalid package.json');
    }

    const data = JSON.parse(readFileSync(process.env.npm_package_json, { encoding: 'utf8' }));

    if (!data?.version) {
      throw new Error('Invalid version');
    }

    return data.version;
  }

  public async run(): Promise<void> {
    try {
      Logger.info(`Version: **${this.getVersion()}**`);
    } catch (error: unknown) {
      Logger.error(error, 'Failed to read version');
    }
  }
}
