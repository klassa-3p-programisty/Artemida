import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prismaORM/prisma.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { randomInt } from 'node:crypto';
import { CreateUsersDto } from "./dto/create-users.dto.js";
import bcrypt from "bcrypt"
import { ConfigService } from "@nestjs/config";
import { ICreateUserResponse } from "./types/types.js";


@Injectable()
export class UserService{
    private readonly passSecret: string = "govnooslinoe";
    private salt: number;

    constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService){
        this.salt = Number(this.configService.getOrThrow("SALT"))
    }

    async createUser(dto: CreateUserDto | CreateUsersDto) {
    if ('users' in dto) {
        const users: ICreateUserResponse[] = [] 
        await this.prisma.$transaction(async(tx)=>{
            for(const rawUser of dto.users){
                const userLogin = this.generateLogin(rawUser.name, rawUser.surname);
                const password = this.generatePassword(12, this.passSecret);
                const passwordHash = await bcrypt.hash(password, this.salt);
                
                const user = await tx.user.create({
                    data: {
                        role: rawUser.role,
                        name: rawUser.name,
                        surname: rawUser.surname,
                        login: userLogin,
                        passwordHash,
                    },
                })
                const userResponse: ICreateUserResponse = {
                    login: userLogin,
                    password: password,
                }
                users.push(userResponse)
            }
            
        })

        return {...users}
    }

    const { role, name, surname } = dto;
    const login = this.generateLogin(name, surname);
    const password = this.generatePassword(12, this.passSecret);
    const passwordHash = await bcrypt.hash(password, this.salt);

    const user = await this.prisma.user.create({
        data: {
        role,
        name,
        surname,
        login,
        passwordHash,
        },
    });

    return {
        login,
        password,
        id: user.id,
    } as ICreateUserResponse;
    }

    async getUserByLogin(login: string){
        return await this.prisma.user.findUnique({
            where: {login: login}
        })
    }

    async getUserById(id: number){
        return await this.prisma.user.findUnique({
            where: { id }
        })
    }

    private generateLogin (firstName: string, lastName: string): string {
        const firstNameLeter = firstName.split("")[0]
        const lastNameLetter = lastName.split("")[0]
        const code = randomInt(100000, 1000000);
        return `${firstNameLeter}${lastNameLetter}${code}`
    }

    private generatePassword(rawLength: number = 12,word: string = '',): string {
        const length = rawLength + word.length
        if (!Number.isInteger(length) || length < 1) {
            throw new Error('Password length must be a positive integer');
        }

        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

        const letters = Array.from(word);
        const password: string[] = [];

        let wordIndex = 0;

        for (let i = 0; i < length; i++) {
            if (i % 2 === 1 && letters.length > 0) {
            password.push(letters[wordIndex % letters.length]);
            wordIndex++;
            } else {
            password.push(chars[randomInt(chars.length)]);
            }
        }

        return password.join('');
    }
}
