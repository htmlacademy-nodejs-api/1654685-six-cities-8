import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnectedToDatabase: boolean = false;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {}

  public isConnected() {
    return this.isConnectedToDatabase;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase) {
      throw new Error('MongoDB клиент подключен');
    }

    this.logger.info('Подключение к MongoDB…');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnectedToDatabase = true;
        this.logger.info('Соединение с базой данных установлено');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(error, `Не удалось подключиться к базе данных (Попытка ${attempt})`);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Невозможно установить соединение с базой данных (${RETRY_COUNT} попыток)`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase) {
      throw new Error('Не подключен к базе данных');
    }

    await this.mongoose.disconnect?.();
    this.isConnectedToDatabase = false;
    this.logger.info('Соединение с базой данных закрыто');
  }
}
