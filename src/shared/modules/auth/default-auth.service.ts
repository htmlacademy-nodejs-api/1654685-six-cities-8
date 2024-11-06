import { SignJWT } from 'jose';
import { inject, injectable } from 'inversify';
import { createSecretKey } from 'node:crypto';
import { Component } from '../../types/index.js';
import { ENCODING } from '../../../constants/index.js';

import { UserNotFoundException, UserPasswordIncorrectException } from './errors/index.js';
import { LoginUserDto, UserEntity, UserService } from '../user/index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { AuthService } from './auth-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { TokenPayload } from './types/index.js';

export const JWT_ALGORITHM = 'HS256';
export const JWT_EXPIRED = '2d';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = createSecretKey(jwtSecret, ENCODING);
    const tokenPayload: TokenPayload = { email: user.email, name: user.name, id: user.id };

    this.logger.info(`Создание токена для ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.logger.warn(`Пользователь с ${dto.email} не найден`);
      throw new UserNotFoundException();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Неправильный пароль для ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
