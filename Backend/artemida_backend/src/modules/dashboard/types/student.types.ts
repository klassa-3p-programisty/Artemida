import { NotificationType } from "../../../generated/prisma/enums.js"

export interface StudentDashboardInfo{
    newAssigments: IAssignmentShortInfo[]
    deadlines: IAssignmentShortInfo[]
    unreadNotification: IUnreadNotification[]
}

export interface IAssignmentShortInfo{
    id: number
    title: string
    description: string | null
    deadline: Date
    subjectName: string
}

export interface IUnreadNotification{
    id: number
    title: string
    type: NotificationType
}