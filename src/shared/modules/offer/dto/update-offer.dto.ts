import {
  IsDateString,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
  IsArray,
  IsEnum,
  IsInt,
  Max,
  Min,
  Length,
} from 'class-validator';
import { City, OfferComfort, OfferType } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsDateString({}, { message: UpdateOfferValidationMessage.createdAt.invalidFormat })
  createdAt?: Date;

  @IsOptional()
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  description?: string;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferValidationMessage.city.invalid })
  city?: City;

  @IsOptional()
  @MaxLength(256, { message: UpdateOfferValidationMessage.preview.maxLength })
  preview?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.photos.invalidFormat })
  @MaxLength(6, { message: UpdateOfferValidationMessage.photos.maxLength, each: true })
  photos?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalid })
  isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: UpdateOfferValidationMessage.type.invalid })
  type?: OfferType;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.roomsCount.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.roomsCount.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.roomsCount.maxValue })
  roomsCount?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.guestsCount.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.guestsCount.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.guestsCount.maxValue })
  guestsCount?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: UpdateOfferValidationMessage.price.maxValue })
  price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.comforts.invalidFormat })
  @IsEnum(OfferComfort, { message: UpdateOfferValidationMessage.comforts.invalid, each: true })
  comforts?: OfferComfort[];

  @IsArray({ message: UpdateOfferValidationMessage.coordinates.invalidFormat })
  @Length(2, 2, { message: UpdateOfferValidationMessage.coordinates.length })
  coordinates?: number;
}
