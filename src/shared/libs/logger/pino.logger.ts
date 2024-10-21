import { Logger as PinoInstance, pino, transport } from 'pino';
import { injectable } from 'inversify';
import { resolve } from 'node:path';

import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';
import { Logger } from './logger.interface.js';

const ROOT_DIR = '../../../';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, ROOT_DIR, logFilePath);

    const multiTransport = transport({
      targets: [
        { target: 'pino/file', level: 'debug', options: { destination } },
        { target: 'pino/file', level: 'info', options: {} },
      ],
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created... 👌');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public success(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(error: unknown, message: string, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }
}
