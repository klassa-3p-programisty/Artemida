import { Injectable } from "@nestjs/common";
import { IUser } from "../auth/types/types.js";
import { PrismaService } from "../../prismaORM/prisma.service.js";
import { IAssignmentShortInfo, IUnreadNotification, StudentDashboardInfo } from "./types/student.types.js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DashboardService{
    private numberOfEntity: number;
    constructor(private readonly prisma: PrismaService, private readonly config: ConfigService){
        this.numberOfEntity = config.getOrThrow("ENTITY_NUMBER_ON_DASHBOARD")
    }

    async getDashboardInfo(user: IUser){
        switch(user.role){
            case "STUDENT":
                return this.getStudentInfos(user)
            case "TEACHER":
                return this.getTeacherInfos(user)    
        }
    }

    // Student: new assigments, unread notification, deadlines
    private async getStudentInfos(user: IUser){
        return await this.prisma.$transaction(async(tx)=>{
            const studentProfile = await tx.studentProfile.findUnique({
                where: {userId: user.id},
                select: {
                    student_class: true,
                    public_id: true
                }
            })
            if (!studentProfile?.student_class?.id) {
                return null;
            }

            const newAssigments: IAssignmentShortInfo[] = []
            const notifications: IUnreadNotification[] = []
            const deadlines: IAssignmentShortInfo[] = []


            const assignments = await tx.assignment.findMany({
                where: {
                    teacherAssignment: {
                        classId: studentProfile.student_class.id
                    }
                },
                orderBy: {
                    createAt: 'desc'
                },
                take: this.numberOfEntity,
                include: {
                    teacherAssignment: {
                        include:{
                            subject: true
                        }
                    }
                }
            });

            const unreadNotifications = await tx.notification.findMany({
                where: {userId: user.id, isRead: false},
                orderBy: {
                    createdAt: 'desc'
                },
                take: this.numberOfEntity
            })

            const deadlineAssignments = await tx.assignment.findMany({
                where: {
                    teacherAssignment: {
                        classId: studentProfile.student_class.id
                    },
                    deadline: {
                        gte: new Date()
                    }
                },
                orderBy: {
                    deadline: 'asc'
                },
                include: {
                    teacherAssignment: {
                        include: {
                            subject: true
                        }
                    }
                },
                take: this.numberOfEntity
            });
            
            for(let deadlineAssignment of deadlineAssignments){
                deadlines.push({
                    id: deadlineAssignment.id,
                    title: deadlineAssignment.title,
                    description: deadlineAssignment.description,
                    deadline: deadlineAssignment.deadline,
                    subjectName: deadlineAssignment.teacherAssignment.subject.name
                })
            }

            for(let notification of unreadNotifications){
                notifications.push({
                    id: notification.id,
                    title: notification.title,
                    type: notification.type,
                })
            }

            for(let assignment of assignments){
                newAssigments.push({
                    id: assignment.id,
                    title: assignment.title,
                    description: assignment.description,
                    deadline: assignment.deadline,
                    subjectName: assignment.teacherAssignment.subject.name
                })
            }
            return {
                newAssigments,
                deadlines,
                unreadNotification: notifications
            } as StudentDashboardInfo
        })
    }
    //Teacher: новые сообщения и работы, ожидающие проверки.
    //TODO: работы, ожидающие проверки.
    private async getTeacherInfos(user:IUser){
        return this.prisma.$transaction(async(tx)=>{

            const teacherProfile = await tx.teacherProfile.findUnique({
                where: {userId: user.id}
            })

            const newUnreadNotication = await tx.notification.findMany({
                where: {userId: user.id, isRead: false},
                orderBy: {
                    createdAt: 'desc'
                },
                take: this.numberOfEntity
            })

            const waitingSubmissions = await tx.submission.findMany({
                where: {}
            })
        })
    }
}
