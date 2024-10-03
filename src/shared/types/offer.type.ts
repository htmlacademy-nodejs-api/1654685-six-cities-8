import { User } from './user.type.js';

export enum City {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}

export enum OfferType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel',
}

export enum OfferComfort {
  BREAKFAST = 'Breakfast',
  AIR_CONDITIONER = 'Air conditioning',
  WORKSPACE = 'Laptop friendly workspace',
  BABY_SEAT = 'Baby seat',
  WASHER = 'Washer',
  TOWELS = 'Towels',
  FRIDGE = 'Fridge',
}

/** Предложение по аренде
 * @desc Описание [Сущности]{@link https://up.htmlacademy.ru/nodejs-api/8/project/six-cities#offer-entity} */
export interface Offer {
  id: string;

  /** Наименование
   * @desc Мин. 10 символов, макс. - 100 */
  title: string;

  /** Описание предложения
   * @desc Мин. 20 символов, макс. - 1024 */
  description: string;

  /** Дата публикации предложения */
  createdAt: string;

  /** Дата изменения */
  updatedAt?: string;

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
  type: OfferType;

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
  comforts: OfferComfort[] | OfferComfort;

  /** Автор предложения */
  author: User;

  /** Количество комментариев
   * @desc Рассчитывается автоматически */
  commentsCount: number;

  /** Координаты предложения для аренды
   * @desc Координаты представлены широтой и долготой */
  coordinates: number[];
}
