import { StringBooleanValue } from '@/constants/index.js';
import { City, OfferComfort, OfferType } from '@/shared/types/offer.type.js';
import { UserType } from '@/shared/types/user.type.js';

export type StrBool = 'true' | 'false';

export type MockServerData = {
  offer: {
    types: OfferType[];
    titles: string[];
    cities: City[];
    descriptions: string[];
    comforts: OfferComfort[];
    photos: string[];
  };
  user: {
    types: UserType[];
    names: string[];
    emails: string[];
    avatars: string[];
  };
  comments: string[];
};

export type MockTableData = [
  /** id */
  string,

  /** title */
  string,

  /** description */
  string,

  /** createdAt */
  string,

  /** city */
  City,

  /** preview */
  string,

  /** photos */
  string,

  /** isPremium */
  StringBooleanValue,

  /** isFavorite */
  StringBooleanValue,

  /** rating */
  string,

  /** offerType */
  OfferType,

  /** roomsCount */
  string,

  /** guestsCount */
  string,

  /** price */
  string,

  /** comforts */
  OfferComfort,

  /** commentsCount */
  string,

  /** coordinates */
  string,

  /** authorName */
  string,

  /** authorEmail */
  string,

  /** authorType */
  UserType,
];

export type MockTableRawData = [
  /** id */
  string,

  /** title */
  string,

  /** description */
  string,

  /** createdAt */
  string,

  /** city */
  City,

  /** preview */
  string,

  /** photos */
  string,

  /** isPremium */
  StringBooleanValue,

  /** isFavorite */
  StringBooleanValue,

  /** rating */
  number,

  /** offerType */
  OfferType,

  /** roomsCount */
  number,

  /** guestsCount */
  number,

  /** price */
  number,

  /** comforts
   * @desc OfferComfort */
  string,

  /** commentsCount */
  number,

  /** coordinates */
  string,

  /** authorName */
  string,

  /** authorEmail */
  string,

  /** authorType */
  UserType,
];
