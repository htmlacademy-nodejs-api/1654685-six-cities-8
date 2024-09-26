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

export type ChalkColorMethod =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'

  /* Alias for `blackBright */
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgGray'
  | 'bgGrey'
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright';
