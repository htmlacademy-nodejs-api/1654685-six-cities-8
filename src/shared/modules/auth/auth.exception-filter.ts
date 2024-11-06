import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseUserException } from './errors/index.js';
import { ExceptionFilter } from '../../libs/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: Error, _request: Request, response: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    response.status(error.httpStatusCode).json({
      type: 'AUTHORIZATION',
      error: error.message,
    });
  }
}
