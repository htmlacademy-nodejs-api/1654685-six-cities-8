import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
  IsNumber,
  IsString,
  IsArray,
  IsEnum,
  Length,
  Max,
  Min,
} from 'class-validator';
import { City, OfferComfort, OfferType } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsDateString({}, { message: UpdateOfferValidationMessage.createdAt.invalidFormat })
  createdAt?: Date;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  @Expose()
  title?: string;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  @Expose()
  description?: string;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferValidationMessage.city.invalid })
  @Expose()
  city?: City;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.title.invalidFormat })
  @MaxLength(256, { message: UpdateOfferValidationMessage.preview.maxLength })
  @Expose()
  preview?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.photos.invalidFormat })
  @MaxLength(6, { message: UpdateOfferValidationMessage.photos.maxLength, each: true })
  @Expose()
  photos?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalid })
  @Expose()
  isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: UpdateOfferValidationMessage.type.invalid })
  @Expose()
  type?: OfferType;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.roomsCount.maxValue })
  @Expose()
  roomsCount?: number;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.guestsCount.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.guestsCount.maxValue })
  @Expose()
  guestsCount?: number;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: UpdateOfferValidationMessage.price.maxValue })
  @Expose()
  price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.comforts.invalidFormat })
  @IsEnum(OfferComfort, { message: UpdateOfferValidationMessage.comforts.invalid, each: true })
  @Expose()
  comforts?: OfferComfort[];

  @IsArray({ message: UpdateOfferValidationMessage.coordinates.invalidFormat })
  @Length(2, 2, { message: UpdateOfferValidationMessage.coordinates.length })
  @Expose()
  coordinates?: number;
}
