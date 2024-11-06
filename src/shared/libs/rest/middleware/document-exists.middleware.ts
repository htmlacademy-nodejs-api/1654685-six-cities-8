import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { DocumentExists } from '../../../types/index.js';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class DocumentExistsMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentExists,
    private readonly entityName: string,
    private readonly paramName: string
  ) {}

  public async execute({ params }: Request, _response: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    const exists = await this.service.exists(documentId);

    if (!exists) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} №${documentId} не найден.`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
