import { User } from './user.type.js';

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum OfferType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export enum OfferComfort {
  Breakfast = 'Breakfast',
  AirConditioner = 'Air conditioning',
  Workspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
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
