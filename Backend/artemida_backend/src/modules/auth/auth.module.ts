import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module.js";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { AuthGuard } from "./guards/auth.guard.js";
import { RolesGuard } from "./guards/roles.guard.js";

@Module({
    imports:[UserModule],
    providers: [AuthService, AuthGuard, RolesGuard],
    controllers: [AuthController],
    exports:[AuthGuard, RolesGuard]
})
export class AuthModule{}
