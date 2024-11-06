import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { ExceptionFilter } from './exception-filter.interface.js';
import { Component } from '../../../types/index.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';
import { Logger } from '../../logger/index.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info('Register AppExceptionFilter');
  }

  private handleHttpError(
    error: HttpError,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`, error);

    response.status(error.httpStatusCode).json(new Error(error.message));
  }

  private handleOtherError(
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) {
    this.logger.error(error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new Error(error.message));
  }

  public catch(
    error: Error | HttpError,
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, request, response, next);
    }

    this.handleOtherError(error, request, response, next);
  }
}
