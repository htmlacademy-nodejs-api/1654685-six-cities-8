import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/common.js';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { AllOffersRequest } from './type/all-offers-request.js';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
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

    this.addRoutes([
      {
        path: '/:offerId',
        handler: this.show,
        middlewares: [
          new ValidateObjectIdMiddleware('offerId'),
          new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        ],
      },
      {
        path: '/:offerId',
        method: HttpMethod.delete,
        handler: this.delete,
        middlewares: [
          new ValidateObjectIdMiddleware('offerId'),
          new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        ],
      },
      {
        path: '/:offerId',
        method: HttpMethod.patch,
        handler: this.update,
        middlewares: [
          new ValidateObjectIdMiddleware('offerId'),
          new ValidateDtoMiddleware(UpdateOfferDto),
          new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        ],
      },
      { path: '/', handler: this.index },
      {
        path: '/',
        method: HttpMethod.post,
        handler: this.create,
        middlewares: [new ValidateDtoMiddleware(CreateOfferDto)],
      },
    ]);
  }

  public async show({ params }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index(req: AllOffersRequest, res: Response) {
    let count: number | undefined = undefined;

    if (req.query.count !== undefined) {
      count = +req.query.count;
    }

    const offers = await this.offerService.find(count);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body }: CreateOfferRequest, res: Response) {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    this.noContent(res, offer);
  }

  public async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.updateById(params.offerId, body);
    const updatedOffer = await this.offerService.findById(result?.id);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getPremiumOfferByCity() {}
}
