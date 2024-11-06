import {
  IsDateString,
  IsOptional,
  IsBoolean,
  IsMongoId,
  MaxLength,
  MinLength,
  IsArray,
  Length,
  IsEnum,
  IsInt,
  Max,
  Min,
} from 'class-validator';
import { City, OfferComfort, OfferType, User } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.createdAt.invalidFormat })
  createdAt?: string;

  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  description: string;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  city: City;

  @MaxLength(256, { message: CreateOfferValidationMessage.preview.maxLength })
  preview: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @MaxLength(6, { message: CreateOfferValidationMessage.photos.maxLength, each: true })
  photos: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalid })
  isPremium?: boolean;

  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsCount.maxValue })
  roomsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsCount.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsCount.maxValue })
  guestsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  price: number;

  @IsArray({ message: CreateOfferValidationMessage.comforts.invalidFormat })
  @IsEnum(OfferType, { message: CreateOfferValidationMessage.comforts.invalid, each: true })
  comforts: OfferComfort[];

  @IsMongoId({ message: CreateOfferValidationMessage.author.invalidId })
  author: User;

  @IsArray({ message: CreateOfferValidationMessage.coordinates.invalidFormat })
  @Length(2, 2, { message: CreateOfferValidationMessage.coordinates.length, each: true })
  coordinates: number[];
}
