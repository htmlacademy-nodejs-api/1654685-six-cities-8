import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Comment } from '../../types/index.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: { collection: 'comment', timestamps: true },
})
export class CommentEntity extends defaultClasses.TimeStamps implements Comment {
  @prop({ required: true, trim: true })
  public text!: string;

  @prop({ required: true })
  public publishedAt!: string;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true })
  public authorId!: string;
}

export const CommentModel = getModelForClass(CommentEntity);
