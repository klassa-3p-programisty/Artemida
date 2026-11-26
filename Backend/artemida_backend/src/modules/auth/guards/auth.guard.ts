import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from '../../users/user.service.js';
import { UserStatus } from '../../../generated/prisma/enums.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.session?.userId;
    if (!userId) throw new UnauthorizedException();

    const user = await this.userService.getUserById(userId);
    if (!user || user.status === UserStatus.BLOCKED) {
      request.session.destroy(() => undefined);
      throw new UnauthorizedException();
    }

    const { passwordHash, ...safeUser } = user;
    void passwordHash;
    request.user = safeUser;
    return true;
  }
}
