import { uid } from 'uid';
import {
  getRandomDate,
  getRandomItem,
  getRandomItems,
  convertArrayToString,
  generateRandomNumber,
  getRandomBooleanValue,
} from '@/shared/helpers/index.js';
import { coordinatesCityMap } from '@/constants/city.js';
import { MockServerData, MockTableRawData } from '@/shared/types/index.js';
import { OfferGenerator } from './index.js';
import {
  GUEST_MAX_VALUE,
  GUEST_MIN_VALUE,
  PRICE_MAX_VALUE,
  PRICE_MIN_VALUE,
  RATING_MAX_VALUE,
  RATING_MIN_VALUE,
  ROOM_MAX_VALUE,
  ROOM_MIN_VALUE,
  COMMENTS_COUNT_MAX_VALUE,
} from '@/constants/index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const id = uid();
    const title = getRandomItem(this.mockData.offer.titles);
    const description = getRandomItem(this.mockData.offer.descriptions);
    const createdAt = getRandomDate().toISOString();
    const city = getRandomItem(this.mockData.offer.cities);
    const preview = getRandomItem(this.mockData.offer.photos);
    const photos = convertArrayToString(getRandomItems(this.mockData.offer.photos));
    const offerType = getRandomItem(this.mockData.offer.types);
    const comforts = convertArrayToString(getRandomItems(this.mockData.offer.comforts));
    const authorName = getRandomItem(this.mockData.user.names);
    const authorEmail = getRandomItem(this.mockData.user.emails);
    const authorType = getRandomItem(this.mockData.user.types);
    const isPremium = getRandomBooleanValue();
    const isFavorite = getRandomBooleanValue();
    const rating = generateRandomNumber(RATING_MIN_VALUE, RATING_MAX_VALUE, 1);
    const roomsCount = generateRandomNumber(ROOM_MIN_VALUE, ROOM_MAX_VALUE);
    const guestsCount = generateRandomNumber(GUEST_MIN_VALUE, GUEST_MAX_VALUE);
    const price = generateRandomNumber(PRICE_MIN_VALUE, PRICE_MAX_VALUE);
    const commentsCount = generateRandomNumber(0, COMMENTS_COUNT_MAX_VALUE);
    const coordinates = convertArrayToString(coordinatesCityMap[city]);

    const result: MockTableRawData = [
      id,
      title,
      description,
      createdAt,
      city,
      preview,
      photos,
      isPremium,
      isFavorite,
      rating,
      offerType,
      roomsCount,
      guestsCount,
      price,
      comforts,
      commentsCount,
      coordinates,
      authorName,
      authorEmail,
      authorType,
    ];

    return result.join('\t');
  }
}
