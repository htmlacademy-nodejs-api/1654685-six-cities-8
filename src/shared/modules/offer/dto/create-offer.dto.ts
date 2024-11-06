import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { City, OfferComfort, OfferType, User } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.createdAt.invalidFormat })
  createdAt?: string;

  @IsString({ message: CreateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  @Expose()
  title: string;

  @IsString({ message: CreateOfferValidationMessage.description.invalidFormat })
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  @Expose()
  description: string;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  @Expose()
  city: City;

  @IsString({ message: CreateOfferValidationMessage.preview.invalidFormat })
  @MaxLength(256, { message: CreateOfferValidationMessage.preview.maxLength })
  preview: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @MaxLength(6, { message: CreateOfferValidationMessage.photos.maxLength, each: true })
  @Expose()
  photos: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalid })
  @Expose()
  isPremium?: boolean;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  type: OfferType;

  @IsNumber({}, { message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  @Expose()
  roomsCount: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsCount.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsCount.maxValue })
  @Expose()
  guestsCount: number;

  @IsNumber({}, { message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  @Expose()
  price: number;

  @IsArray({ message: CreateOfferValidationMessage.comforts.invalidFormat })
  @IsEnum(OfferComfort, { message: CreateOfferValidationMessage.comforts.invalid, each: true })
  @Expose()
  comforts: OfferComfort[];

  author: User;

  @IsArray({ message: CreateOfferValidationMessage.coordinates.invalidFormat })
  @Length(2, 2, { message: CreateOfferValidationMessage.coordinates.length, each: true })
  @Expose()
  coordinates: number[];
}
