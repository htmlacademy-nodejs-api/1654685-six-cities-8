export const END_OF_LINE = '\n';
export const TAB_CHAR = '\t';
export const DELIMITER = ';';

export const FIRST_WEEK_DAY = 1;
export const LAST_WEEK_DAY = 7;

export const TSV_CHUNK_SIZE = 16384; // 16KB
export const ENCODING = 'utf-8' as const;

export const LINE_END_EVENT_NAME = 'line' as const;
export const END_EVENT_NAME = 'end' as const;

export enum StringBooleanValue {
  TRUE = 'true',
  FALSE = 'false',
}
