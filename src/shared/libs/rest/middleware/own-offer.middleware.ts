import { NextFunction, Request, Response } from 'express';
import { DocumentType } from '@typegoose/typegoose';
import { StatusCodes } from 'http-status-codes';

import { OfferEntity, OfferService } from '../../../modules/offer/index.js';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class OwnOfferMiddleware implements Middleware {
  constructor(private readonly offerService: OfferService) {}

  public async execute(
    { params, tokenPayload }: Request,
    _response: Response,
    next: NextFunction
  ): Promise<void> {
    const offer = (await this.offerService.findById(params.offerId)) as DocumentType<OfferEntity>;

    if (!(offer.author._id.toString() === tokenPayload.id)) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Нет доступа', 'OfferController');
    }

    return next();
  }
}
