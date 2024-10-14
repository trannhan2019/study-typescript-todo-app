"use server";

import { authRegisterSchema } from "@/schema/auth";
import { z } from "zod";
import prisma from "@/libs/prisma";
import { hash } from "bcryptjs";
// import { signIn } from "next-auth/react"; // use client

export const register = async (values: z.infer<typeof authRegisterSchema>) => {
  const validated = authRegisterSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Invalid values" };
  }

  const { name, username, password } = validated.data;
  const checkUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (checkUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  const res = await prisma.user.create({
    data: {
      name,
      username,
      password: hashedPassword,
    },
  });

  if (!res) {
    return { error: "Something went wrong" };
  }

  return { success: "User created successfully" };
};
