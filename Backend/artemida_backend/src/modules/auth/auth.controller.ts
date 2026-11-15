import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthGuard } from './guards/auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() request: Request) {
    const user = await this.authService.validateUser(dto.login, dto.password);

    await new Promise<void>((resolve, reject) => {
      request.session.regenerate((error) => (error ? reject(error) : resolve()));
    });
    request.session.userId = user.id;
    await new Promise<void>((resolve, reject) => {
      request.session.save((error) => (error ? reject(error) : resolve()));
    });

    return {
      user,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
    };
  }

  @Post('logout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    await new Promise<void>((resolve, reject) => {
      request.session.destroy((error) => (error ? reject(error) : resolve()));
    });
    response.clearCookie('connect.sid');
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() request: Request) {
    return {
      user: request.user,
      role: request.user?.role,
      mustChangePassword: request.user?.mustChangePassword,
    };
  }
}
