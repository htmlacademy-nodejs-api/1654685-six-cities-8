import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Controller, ExceptionFilter, ParseTokenMiddleware } from '../shared/libs/rest/index.js';
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
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter
  ) {
    this.server = express();
  }

  private async initDb() {
    this.logger.info('Init database…');
    await this.databaseClient.connect(this.config.mongoUri);

    this.logger.info('Init database completed');
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
    this.server.use('/comments', this.commentController.router);
    // this.server.use('/category', this.categoryController.router);
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
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.logger.info('Инициализация фильтров исключений завершена');
  }

  public async init() {
    this.logger.info('Инициализация приложения');
    this.logger.info(`Получить значение $PORT из переменной окружения: ${this.config.get('PORT')}`);

    await this.initDb();

    this.initMiddleware();
    this.initControllers();
    this.initExceptionFilters();

    this.initServer();
  }
}
