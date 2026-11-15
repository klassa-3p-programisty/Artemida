import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../generated/prisma/enums.js"
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto{

    @ApiProperty()
    @IsOptional()
    @IsEnum(Role)
    role: Role

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    surname: string
    
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    classId?: number

}