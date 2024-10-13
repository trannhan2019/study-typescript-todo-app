//next auth v5

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authLoginSchema } from "./schema/auth";
import prisma from "./libs/prisma";
import { compare } from "bcryptjs";
import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedFields = authLoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }
        const { username, password } = validatedFields.data;
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      // console.log("session callback", session, token);
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        const existingUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });
        token.role = existingUser?.role;
      }
      // console.log("jwt callback", token, user);

      return token;
    },

    // signIn: ({ user, account }) => {
    //   console.log("callback signIn", user, account);

    //   return true;
    // },
  },
});
