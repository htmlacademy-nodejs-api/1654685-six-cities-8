import { ClassConstructor, plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import {
  DELIMITER,
  LAST_WEEK_DAY,
  FIRST_WEEK_DAY,
  StringBooleanValue,
} from '../../constants/index.js';

export function generateRandomNumber(min: number, max: number, fractionDigits = 0) {
  return +(Math.random() * (max - min) + min).toFixed(fractionDigits);
}

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomBooleanValue() {
  return getRandomItem([StringBooleanValue.True, StringBooleanValue.False]);
}

export function getRandomDate() {
  return dayjs().subtract(generateRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day');
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomNumber(0, items.length - 1);
  const endPosition = startPosition + generateRandomNumber(startPosition, items.length);

  return items.slice(startPosition, endPosition);
}

export function convertArrayToString<T>(items: T[]): string {
  return items.join(DELIMITER);
}

export function convertStringToArray(value: string) {
  return value.split(DELIMITER);
}

export function parseStrings<T = string>(value: string) {
  return convertStringToArray(value).map((item) => item.trim()) as T[];
}

export function parseNumbers<T = number>(value: string) {
  return convertStringToArray(value).map((item) => Number(item.trim())) as T[];
}

export function parseBoolean(value: string) {
  return value.toLowerCase() === StringBooleanValue.True;
}

/** @example declination(5, ['яблоко', 'яблока', 'яблок']) => "яблок" */
export function declination(count: number, words: string[]) {
  if (count % 1 !== 0) {
    return words[1];
  }

  const CASES = [2, 0, 1, 1, 1, 2] as const;
  return words[count % 100 > 4 && count % 100 < 20 ? 2 : CASES[count % 10 < 5 ? count % 10 : 5]];
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}
