import { inject, injectable } from 'inversify';
import express, { Express } from 'express';

import { Controller, ExceptionFilter, ParseTokenMiddleware } from '../shared/libs/rest/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient)
    @inject(Component.UserController)
    @inject(Component.OfferController)
    @inject(Component.CommentController)
    @inject(Component.CategoryController)
    @inject(Component.ExceptionFilter)
    @inject(Component.AuthExceptionFilter)
    private readonly databaseClient: DatabaseClient,
    private readonly userController: Controller,
    private readonly offerController: Controller,
    private readonly commentController: Controller,
    private readonly categoryController: Controller,
    private readonly appExceptionFilter: ExceptionFilter,
    private readonly authExceptionFilter: ExceptionFilter
  ) {
    this.server = express();
  }

  private readonly server: Express;

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
    this.server.use('/comment', this.commentController.router);
    this.server.use('/category', this.categoryController.router);
    this.logger.info('Инициализация контроллеров завершена');
  }

  private initMiddleware() {
    this.logger.info('Инициализация middleware-ов');
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(express.json());
    this.server.use('/upload', express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.logger.info('Инициализация middleware-ов завершена');
  }

  private initExceptionFilters() {
    this.logger.info('Инициализация фильтров исключений');
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
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
