import { Entity } from "@/types/index.js";

export enum UserType {
  /** Обычный */
  REGULAR = 'regular',

  /** Продвинутый */
  PRO = 'pro',
}

export interface User extends Entity {
  /** Имя
   * @desc Мин. 1 символ, макс. - 15 */
  name: string

  /** Электронная почта
   * @unique
   * @desc Валидный адрес электронной почты */
  email: string

  /** Аватар пользователя
   * @desc Изображение пользователя в формате .jpg или .png */
  avatar?: string

  /** Пароль
   * @desc Мин. 6 символов, макс. - 12 */
  password: string

  /** Тип пользователя */
  type: UserType
}
