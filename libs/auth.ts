import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcryptjs";
import { authLoginSchema } from "@/schema/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validated = authLoginSchema.safeParse(credentials);

        if (!validated.success) {
          throw new Error("Invalid credentials");
        }
        const { username, password } = validated.data;
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!user || !user.password) {
          throw new Error("User not found");
        }
        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.role = token.role || "USER";
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
