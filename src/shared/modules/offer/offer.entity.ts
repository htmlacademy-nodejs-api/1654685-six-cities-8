import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, OfferComfort, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title: string;

  @prop({ trim: true, required: true })
  public description: string;

  @prop({ type: () => String, enum: City, required: true })
  public city: City;

  @prop({ required: true })
  public preview: string;

  @prop({ type: () => String, required: true })
  public photos: string[];

  @prop({ required: true, default: false })
  public isPremium: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({ type: () => String, enum: OfferType, required: true })
  public type: OfferType;

  @prop({ required: true })
  public roomsCount: number;

  @prop({ required: true })
  public guestsCount: number;

  @prop({ required: true })
  public price: number;

  @prop({ type: () => String, enum: OfferComfort, required: true })
  public comforts: OfferComfort[];

  @prop({ ref: UserEntity, required: true })
  public author: Ref<UserEntity>;

  @prop({ required: true })
  public coordinates: number[];
}

export const OfferModel = getModelForClass(OfferEntity);
