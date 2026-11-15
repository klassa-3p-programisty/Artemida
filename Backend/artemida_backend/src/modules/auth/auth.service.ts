import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserStatus } from '../../generated/prisma/enums.js';
import { UserService } from '../users/user.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.getUserByLogin(login);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid login or password');
    }

    //TODO: ?
    if (user.status === UserStatus.BLOCKED) {
      throw new ForbiddenException('Account is not active');
    }

    const { passwordHash, ...safeUser } = user;
    void passwordHash;
    return safeUser;
  }
}
