import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  rating: number;

  @Expose()
  offerId: string;

  @Expose()
  userId: string;
}
