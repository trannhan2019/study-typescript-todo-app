"use server";

import { todoAddSchema, todoEditSchema } from "@/schema/todo";
import { z } from "zod";
import prisma from "@/libs/prisma";
import { TodoSearchParams } from "@/types/todo.type";

export const getTodos = async (searchParams: TodoSearchParams) => {
  const page = parseInt(searchParams?.page || "1");
  const limit = parseInt(searchParams?.limit || "5");
  const skip = (page - 1) * limit;
  const take = limit;
  const search = searchParams?.search || "";

  let where: any = {};
  if (search) {
    where = {
      title: {
        contains: search,
        mode: "insensitive",
      },
    };
  }
  const todos = await prisma.todo.findMany({
    where,
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.todo.count({ where });
  const totalPages = Math.ceil(total / limit);

  return { todos, page, totalPages };
};

export const addTodo = async (values: z.infer<typeof todoAddSchema>) => {
  const validated = todoAddSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Invalid values" };
  }

  const { title } = validated.data;

  const res = await prisma.todo.create({
    data: {
      title,
    },
  });

  if (!res) {
    return { error: "Something went wrong" };
  }

  return { success: "Todo added successfully" };
};

export const editTodo = async (
  id: string,
  values: z.infer<typeof todoEditSchema>
) => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    return { error: "Todo not found" };
  }

  const validated = todoEditSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Invalid values" };
  }

  const { title, isCompleted } = validated.data;

  const res = await prisma.todo.update({
    where: { id },
    data: {
      title,
      isCompleted,
    },
  });

  if (!res) {
    return { error: "Something went wrong" };
  }

  return { success: "Todo updated successfully" };
};

export const deleteTodo = async (id: string) => {
  const res = await prisma.todo.delete({
    where: { id },
  });

  if (!res) {
    return { error: "Something went wrong" };
  }

  return { success: "Todo deleted successfully" };
};
