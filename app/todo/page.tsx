import { Anchor, Container, Group, Paper, Title } from "@mantine/core";
import Link from "next/link";

import { TodoResponse, TodoSearchParams } from "@/types/todo.type";
import TodoList from "./TodoList/ToddoList";
import prisma from "@/prisma/prismadb";

interface PageProps {
  searchParams: TodoSearchParams;
}

const fetchTodos = async (searchParams: TodoSearchParams) => {
  try {
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
  } catch (error) {
    console.log("error todo", error);
  }
};

const TodoPage = async ({ searchParams }: PageProps) => {
  const data = await fetchTodos(searchParams);

  return (
    <Container p="md">
      <Paper withBorder shadow="md" p={"md"}>
        <Group justify="space-between">
          <Title mb={"md"} order={1}>
            Todo App
          </Title>
          <Anchor component={Link} href={"/"}>
            Go back Home
          </Anchor>
        </Group>

        <TodoList todoData={data as TodoResponse} />
      </Paper>
    </Container>
  );
};

export default TodoPage;
