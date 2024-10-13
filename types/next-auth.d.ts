import NextAuth, { DefaultSession } from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
