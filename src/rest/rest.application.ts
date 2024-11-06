import { inject, injectable } from 'inversify';
import express, { Express } from 'express';

import { Controller, ExceptionFilter } from '../shared/libs/rest/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    @inject(Component.ExceptionFilter)
    private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.UserController)
    private readonly userController: Controller,
    @inject(Component.OfferController)
    private readonly offerController: Controller,
    private readonly databaseClient: DatabaseClient
  ) {
    this.server = express();
  }

  private initServer() {
    this.logger.info('Инициализация сервера…');

    const port = this.config.get('PORT');
    this.server.listen(port);

    this.logger.info(`🚀 Сервер запущен: http://localhost:${port}`);
  }

  private initControllers() {
    this.logger.info('Инициализация контроллеров');
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.logger.info('Инициализация контроллеров завершена');
  }

  private initMiddleware() {
    this.logger.info('Инициализация middleware-ов');
    this.server.use(express.json());
    this.logger.info('Инициализация middleware-ов завершена');
  }

  private initExceptionFilters() {
    this.logger.info('Инициализация фильтров исключений');
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.logger.info('Инициализация фильтров исключений завершена');
  }

  private async initDb() {
    await this.databaseClient.connect(this.config.mongoUri);
  }

  public async init() {
    this.logger.info('Инициализация приложения');
    this.logger.info(`Получить значение $PORT из переменной окружения: ${this.config.get('PORT')}`);

    this.logger.info('Инициализировать базу данных…');
    await this.initDb();
    this.logger.info('Инициализация базы данных завершена');

    this.initMiddleware();
    this.initControllers();
    this.initExceptionFilters();

    this.initServer();
  }
}
