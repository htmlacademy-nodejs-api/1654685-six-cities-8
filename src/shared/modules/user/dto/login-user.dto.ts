import { IsEmail, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateLoginUserMessage } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: CreateLoginUserMessage.email.invalidFormat })
  @Expose()
  public email: string;

  @IsString({ message: CreateLoginUserMessage.password.invalidFormat })
  @Length(6, 12, { message: CreateLoginUserMessage.password.lengthField })
  @Expose()
  public password: string;
}
