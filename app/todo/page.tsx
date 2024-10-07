import { Anchor, Container, Group, Paper, Title } from "@mantine/core";
import Link from "next/link";
import TodoAddForm from "./TodoAddForm/TodoAddForm";

// import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma/prismadb";
import { TodoType } from "@/types/todo.type";
import TodoList from "./TodoList/ToddoList";

// const prisma = new PrismaClient();

// const fetchTodos = async () => {
//   try {
//     const todos = await prisma.todo.findMany();
//     return todos;
//   } catch (error) {
//     console.log("error todo", error);
//   }
// };

const fetchTodos = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    return await res.json();
  } catch (error) {
    console.log("error", error);
  }
};

const TodoPage = async () => {
  const todos = await fetchTodos();
  // console.log("todos", todos);

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
        <TodoAddForm />
        <TodoList todos={todos as TodoType[]} />
      </Paper>
    </Container>
  );
};

export default TodoPage;
