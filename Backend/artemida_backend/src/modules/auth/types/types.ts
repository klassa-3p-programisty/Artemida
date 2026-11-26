// {
//   id: 23,
//   role: 'STUDENT',
//   status: 'PENDING',
//   name: 'Test20',
//   surname: 'Test20',
//   description: null,
//   profileImageUrl: 'https://res.cloudinary.com/dcknki3cq/image/upload/v1794601192/user.png',
//   email: null,
//   login: 'TT377906',
//   mustChangePassword: true,
//   createdAt: 2026-11-25T07:46:18.152Z,
//   updatedAt: 2026-11-25T07:46:18.152Z
// }
import {Role, UserStatus} from "../../../generated/prisma/enums.js"

export interface IUser {
    id: number
    role: Role
    status: UserStatus
    name: string
    surname: string
    description: null | string
    profileImageUrl: string
    email: string | null
    login: string
    mustChangePassword: Boolean
    createdAt: Date
    updatedAt: Date
}