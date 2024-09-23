export type Coordinates = {
  /** Latitude */
  x: number;

  /** Longitude */
  y: number;
};

export interface Entity {
  id: string;

  /** Дата создания */
  createdAt: string;

  /** Дата изменения */
  updatedAt: string;
}

/** Комментарий
 * @desc Описание [Сущности]{@link https://up.htmlacademy.ru/nodejs-api/8/project/six-cities#comment-entity} */
export interface Comment {
  /** Текст комментария
   * @desc Мин. 5 символов, макс. 1024 */
  text: string;

  /** Дата публикации предложения */
  publishedAt: string;

  /** Рейтинг
   * @desc Число от 1 до 5 */
  rating: number;

  /** Автор предложения */
  authorId: string;
}
