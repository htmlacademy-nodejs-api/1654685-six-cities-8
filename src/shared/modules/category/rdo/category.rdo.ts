import { Expose } from 'class-transformer';

export class CategoryRdo {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
