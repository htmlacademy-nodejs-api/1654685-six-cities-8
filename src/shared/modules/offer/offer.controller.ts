import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  ValidateCityQueryMiddleware,
  ValidateObjectIdMiddleware,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  BaseController,
  HttpMethod,
  HttpError,
} from '../../libs/index.js';
import { fillDTO } from '../../helpers/common.js';
import { Component } from '../../types/index.js';

import { OwnOfferMiddleware } from '../../libs/rest/middleware/index.js';
import { GetOffersQueryDto } from './dto/get-offers-query.dto.js';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { ParamCity } from './type/param-city.type.js';
import { CommentService } from '../comment/index.js';
import { UserService } from '../user/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { Logger } from '../../libs/index.js';
import { City } from '../../types/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    protected readonly offerService: OfferService,
    @inject(Component.UserService)
    protected readonly userService: UserService,
    @inject(Component.CommentService)
    protected readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    const offerIdMiddlewares = [
      new ValidateObjectIdMiddleware('offerId'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
    ];

    this.addRoutes([
      {
        path: '/premium/:city',
        handler: this.getPremiumOfferByCity,
        middlewares: [new ValidateCityQueryMiddleware()],
      },
      {
        path: '/:offerId/favorites',
        method: HttpMethod.post,
        handler: this.addToFavorite,
        middlewares: [new PrivateRouteMiddleware(), ...offerIdMiddlewares],
      },
      {
        path: '/:offerId/favorites',
        method: HttpMethod.delete,
        handler: this.removeFromFavorite,
        middlewares: [new PrivateRouteMiddleware(), ...offerIdMiddlewares],
      },
      {
        path: '/favorites',
        handler: this.getFavorite,
        middlewares: [new PrivateRouteMiddleware()],
      },
      {
        path: '/:offerId',
        handler: this.show,
        middlewares: offerIdMiddlewares,
      },
      {
        path: '/:offerId',
        method: HttpMethod.delete,
        handler: this.delete,
        middlewares: [
          new PrivateRouteMiddleware(),
          ...offerIdMiddlewares,
          new OwnOfferMiddleware(this.offerService),
        ],
      },
      {
        path: '/:offerId',
        method: HttpMethod.patch,
        handler: this.update,
        middlewares: [
          new PrivateRouteMiddleware(),
          ...offerIdMiddlewares,
          new OwnOfferMiddleware(this.offerService),
          new ValidateDtoMiddleware(UpdateOfferDto),
        ],
      },
      {
        path: '/',
        handler: this.index,
        middlewares: [new ValidateDtoMiddleware(GetOffersQueryDto, 'query')],
      },
      {
        path: '/',
        method: HttpMethod.post,
        handler: this.create,
        middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOfferDto)],
      },
    ]);
  }

  public async show({ params, tokenPayload }: Request<ParamOfferId>, response: Response) {
    const { offerId } = params;

    const offer = await this.offerService.findById(offerId, tokenPayload?.id);

    this.ok(response, fillDTO(OfferRdo, offer));
  }

  public async index(
    {
      query,
      tokenPayload,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      Record<string, unknown>,
      GetOffersQueryDto
    >,
    response: Response
  ) {
    const offers = await this.offerService.find(query?.count, tokenPayload?.id);

    this.ok(response, fillDTO(OfferRdo, offers));
  }

  public async create(
    {
      body,
      tokenPayload,
    }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    response: Response
  ) {
    const result = await this.offerService.create({ ...body, author: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(response, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, response: Response): Promise<void> {
    const { offerId } = params;
    const [deletedOffer] = await Promise.all([
      this.offerService.deleteById(offerId),
      this.commentService.deleteByOfferId(offerId),
    ]);

    this.noContent(response, `Offer with id ${deletedOffer?.id} was deleted`);
  }

  public async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    response: Response
  ): Promise<void> {
    const result = await this.offerService.updateById(params.offerId, body);
    const updatedOffer = await this.offerService.findById(result?.id);

    this.ok(response, fillDTO(OfferRdo, updatedOffer));
  }

  public async addToFavorite(
    { params, tokenPayload }: Request<ParamOfferId, unknown>,
    response: Response
  ) {
    const result = await this.offerService.addToFavorite(params.offerId, tokenPayload.id);

    if (!result) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Adding offer with id "${params.offerId}" to favorites failed`,
        'OfferController'
      );
    }

    this.created(response, `Offer with id "${params.offerId}" was added to favorites`);
  }

  public async getPremiumOfferByCity(
    { params, tokenPayload }: Request<ParamCity>,
    response: Response
  ) {
    const offers = await this.offerService.findPremiumByCity(params?.city as City, tokenPayload?.id);

    this.ok(response, fillDTO(OfferRdo, offers));
  }

  public async removeFromFavorite(
    { params, tokenPayload }: Request<ParamOfferId, unknown>,
    response: Response
  ) {
    const result = await this.offerService.removeFromFavorite(params.offerId, tokenPayload.id);

    if (!result) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Removing offer with id "${params.offerId}" from favorites failed`,
        'OfferController'
      );
    }

    this.noContent(response, `Offer with id "${params.offerId}" was removed from favorites`);
  }

  public async getFavorite({ tokenPayload }: Request, response: Response) {
    const offers = await this.offerService.findFavorite(tokenPayload?.id);

    this.ok(response, fillDTO(OfferRdo, offers));
  }
}
