import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { City } from '../../../types/index.js';

export class ValidateCityQueryMiddleware implements Middleware {
  constructor(private param: string = 'city') {}

  public execute({ params }: Request, _response: Response, next: NextFunction): void {
    const city = params[this.param];

    if (!Object.values(City).includes(city as City)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Город ${params.city} не поддерживается`,
        'OfferController'
      );
    }

    return next();
  }
}
