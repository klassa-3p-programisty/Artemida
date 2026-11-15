import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UserService } from './modules/users/user.service.js';
import { CreateUserDto } from './modules/users/dto/create-user.dto.js';
import { CreateUsersDto } from './modules/users/dto/create-users.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly user: UserService) {}

  @Post("create")
  async createUser(@Body() createDto: CreateUserDto | CreateUsersDto) {
    return await this.user.createUser(createDto);
  }
}
