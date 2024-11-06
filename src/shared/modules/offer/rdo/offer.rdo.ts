import { Expose, Type } from 'class-transformer';
import { City, OfferComfort, OfferType } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  city: City;

  @Expose()
  preview: string;

  @Expose()
  photos: string[];

  @Expose()
  isPremium: boolean;

  @Expose()
  commentsCount: number;

  @Expose()
  rating: number;

  @Expose()
  type: OfferType;

  @Expose()
  roomsCount: number;

  @Expose()
  guestsCount: number;

  @Expose()
  price: number;

  @Expose()
  comforts: OfferComfort[];

  @Expose()
  @Type(() => UserRdo)
  author: UserRdo;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  isFavorite: boolean;
}
