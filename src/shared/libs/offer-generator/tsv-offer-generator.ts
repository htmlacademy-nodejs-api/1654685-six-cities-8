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

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const id = '';
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
    const rating = generateRandomNumber(1, 5, 1);
    const roomsCount = generateRandomNumber(1, 8);
    const guestsCount = generateRandomNumber(1, 10);
    const price = generateRandomNumber(100, 1e5);
    const commentsCount = generateRandomNumber(0, 500);
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
