import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prismaORM/prisma.module.js";
import { DashboardController } from "./dashboard.controller.js";
import { DashboardService } from "./dashboard.service.js";
import { UserService } from "../users/user.service.js";
import { UserModule } from "../users/user.module.js";



@Module({
    imports: [PrismaModule, UserModule],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule{}