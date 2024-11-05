import { inject, injectable } from 'inversify';

import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { OfferService } from '../shared/modules/offer/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient
  ) {}

  private async initDb() {
    await this.databaseClient.connect(this.config.mongoUri);
  }

  public async init() {
    this.logger.info('Инициализация приложения');
    this.logger.info(`Получить значение $PORT из переменной окружения: ${this.config.get('PORT')}`);

    this.logger.info('Инициализировать базу данных…');
    await this.initDb();
    this.logger.info('Инициализация базы данных завершена');

    const offers = await this.offerService.find();

    this.logger.info('Предложения', offers);
  }
}
