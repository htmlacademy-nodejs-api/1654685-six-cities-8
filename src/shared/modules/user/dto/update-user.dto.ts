import { UserType } from '../../../types/index.js';

export class updateUserDto {
  public name?: string;
  public type?: UserType;
  public avatarPath?: string;
}
