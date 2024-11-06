import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferService } from './offer-service.interface.js';
import { OfferController } from './offer.controller.js';
import { Component } from '../../types/index.js';
import { Controller } from '../../libs/index.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService)
    .inSingletonScope();

  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
