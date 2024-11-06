import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import { Controller } from './controller.interface.js';
import { HttpMethod } from '../types/index.js';
import { Logger } from '../../logger/index.js';
import { Route } from '../types/index.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: Router = Router();

  constructor(protected readonly logger: Logger) {}

  get router() {
    return this._router;
  }

  public addRoutes(routes: Route | Route[]) {
    const normalizedRoutes = Array.isArray(routes) ? routes : [routes];

    for (const route of normalizedRoutes) {
      this.addRoute(route);
    }
  }

  private addRoute(route: Route) {
    route.method ??= HttpMethod.get;
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map((item) =>
      asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers
      ? [...middlewareHandlers, wrapperAsyncHandler]
      : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);

    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
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
