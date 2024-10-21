export enum UserType {
  /** Обычный */
  Regular = 'regular',

  /** Продвинутый */
  Pro = 'Pro',
}

/** Пользователь
 * @desc Описание [Сущности]{@link https://up.htmlacademy.ru/nodejs-api/8/project/six-cities#user-entity} */
export interface User {
  /** Имя
   * @desc Мин. 1 символ, макс. - 15 */
  name: string;

  /** Электронная почта
   * @unique
   * @desc Валидный адрес электронной почты */
  email: string;

  /** Аватар пользователя
   * @desc Изображение пользователя в формате .jpg или .png */
  avatarPath?: string;

  /** Тип пользователя */
  type: UserType;
}
