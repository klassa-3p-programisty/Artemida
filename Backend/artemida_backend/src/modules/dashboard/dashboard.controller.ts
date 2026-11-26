import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard.js";
import { CurrentUser } from "../auth/decorators/user.decorator.js";
import { DashboardService } from "./dashboard.service.js";
import { type IUser } from "../auth/types/types.js";

@UseGuards(AuthGuard)
@Controller("dashboard")
export class DashboardController{
    constructor(private readonly dashboardService: DashboardService){}

    @Get()
    async getDashboardInfo(@CurrentUser() user: IUser){
        
        return user
    }

}