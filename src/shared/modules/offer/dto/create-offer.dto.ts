import { City, OfferComfort, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  createdAt: string;
  updatedAt?: string;
  title: string;
  description: string;
  city: City;
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
}
