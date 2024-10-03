export const END_OF_LINE = '\n';
export const TAB_CHAR = '\t';
export const DELIMITER = ';';

export const FIRST_WEEK_DAY = 1;
export const LAST_WEEK_DAY = 7;

export const TSV_CHUNK_SIZE = 16384; // 16KB
export const ENCODING = 'utf-8';

export const RATING_MIN_VALUE = 1;
export const RATING_MAX_VALUE = 5;

export const ROOM_MIN_VALUE = 1;
export const ROOM_MAX_VALUE = 8;

export const GUEST_MIN_VALUE = 1;
export const GUEST_MAX_VALUE = 10;

export const PRICE_MIN_VALUE = 100;
export const PRICE_MAX_VALUE = 1e5;

export const COMMENTS_COUNT_MAX_VALUE = 500;

export enum EventName {
  LINE_READ = 'line',
  FILE_READ = 'end',
}

export enum StringBooleanValue {
  True = 'true',
  False = 'false',
}
