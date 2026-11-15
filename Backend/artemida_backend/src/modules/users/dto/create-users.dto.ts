import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto.js";


export class CreateUsersDto{
    @ApiProperty()
    users: Array<CreateUserDto>
}