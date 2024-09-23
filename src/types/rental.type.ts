import { Entity } from '@/types/index.js';

export enum City {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}

export enum RentalType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel',
}

export enum RentalComfort {
  BREAKFAST = 'Breakfast',
  AIR_CONDITIONER = 'Air conditioning',
  WORKSPACE = 'Laptop friendly workspace',
  BABY_SEAT = 'Baby seat',
  WASHER = 'Washer',
  TOWELS = 'Towels',
  FRIDGE = 'Fridge',
}

export interface Rental extends Entity {
  /** Наименование
   * @desc Мин. 10 символов, макс. - 100 */
  name: string;

  /** Описание предложения
   * @desc Мин. 20 символов, макс. - 1024 */
  description: string;

  /** Дата публикации предложения */
  publishedAt: string;

  /** Город. */
  city: City;

  /** Превью изображения
   * @desc Ссылка на изображение */
  preview: string;

  /** Фотографии жилья
   * @desc Список ссылок на фотографии жилья. Всегда 6 фотографий */
  photos: string[];

  /** Флаг «Премиум»
   * @desc Признак премиальности предложения */
  isPremium?: boolean;

  /** Флаг «Избранное»
   * @desc Признак того, что предложение принадлежит списку избранных предложений пользователя */
  isFavorite?: boolean;

  /** Рейтинг
   * @desc Число от 1 до 5, допускаются числа с запятой (1 знак после запятой) */
  rating?: number;

  /** Тип жилья */
  type: RentalType;

  /** Количество комнат
   * @desc Мин. 1, Макс. 8 */
  roomsCount: number;

  /** Количество гостей
   * @desc Мин. 1, Макс. 10 */
  guestsCount: number;

  /** Стоимость аренды
   * @desc Мин. 100, Макс. 100 000 */
  price: number;

  /** Список удобств */
  comforts: RentalComfort[] | RentalComfort;

  /** Автор предложения */
  authorId: string;

  /** Количество комментариев
   * @desc Рассчитывается автоматически */
  commentsCount: number;

  /** Координаты предложения для аренды
   * @desc Координаты представлены широтой и долготой */
  coordinates: [number, number];
}
