import { City, OfferComfort, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  city: City;
  title: string;
  description: string;
  preview: string;
  photos: string[];
  isPremium?: boolean;
  rating: number;
  type: OfferType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  comforts: OfferComfort[];
  userId: string;
  coordinates: number[];
  createdAt: string;
  updatedAt?: string;
}
