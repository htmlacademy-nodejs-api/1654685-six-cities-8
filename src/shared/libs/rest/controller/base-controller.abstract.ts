import { injectable } from 'inversify';
import { Controller } from './controller.interface.js';
import { Response, Router } from 'express';
import { Logger } from '../../logger/index.js';
import { HttpMethod, Route } from '../types/index.js';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

@injectable()
export abstract class BaseController implements Controller {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: Router = Router();

  constructor(protected readonly logger: Logger) {}

  get router() {
    return this._router;
  }

  public addRoutes(routes: Route | Route[]) {
    for (const route of [routes].flat(2)) {
      this.addRoute(route);
    }
  }

  public addRoute(route: Route) {
    route.method ??= HttpMethod.get;
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map((item) =>
      asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers
      ? [...middlewareHandlers, wrapperAsyncHandler]
      : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);

    this.logger.info(`Маршрут зарегистрирован: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(response: Response, statusCode: number, data: T) {
    response.type(this.DEFAULT_CONTENT_TYPE).status(statusCode).json(data);
  }

  public created<T>(response: Response, data: T): void {
    this.send(response, StatusCodes.CREATED, data);
  }

  public noContent<T>(response: Response, data: T): void {
    this.send(response, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(response: Response, data: T): void {
    this.send(response, StatusCodes.OK, data);
  }
}
