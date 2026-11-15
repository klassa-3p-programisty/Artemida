import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prismaORM/prisma.module.js';
import { UserService } from './user.service.js';

@Module({
    providers: [UserService],
    exports: [UserService],
    imports: [PrismaModule]
})

export class UserModule{

}