import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/common.js';

import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { OfferService } from './offer-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { StatusCodes } from 'http-status-codes';
import { OfferRdo } from './rdo/offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    protected readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для OfferController…');

    this.addRoute({ path: '/id/:id', method: HttpMethod.Get, handler: this.findById });
  }

  public async findById({ params }: Request, res: Response) {
    const id = params.id;

    const offer = await this.offerService.findById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложение с идентификатором ${id} не найдено.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }
}
