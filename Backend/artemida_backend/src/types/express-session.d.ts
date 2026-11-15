import type { Role } from '../generated/prisma/enums.js';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

declare global {
  namespace Express {
    interface User {
      id: number;
      role: Role;
      status: string;
      name: string;
      surname: string;
      login: string;
      email: string | null;
      description: string | null;
      profileImageUrl: string | null;
      mustChangePassword: boolean;
      createdAt: Date;
      updatedAt: Date;
      [key: string]: unknown;
    }
    interface Request {
      user?: User;
    }
  }
}
