import { Anchor, Container, Group, Paper, Title } from "@mantine/core";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";

import { TodoResponse, TodoSearchParams } from "@/types/todo.type";
import TodoList from "@/components/todo/todo-list/todo-list";
import TodoAddForm from "@/components/todo/todo-add-form/todo-add-form";
import TodoSearch from "@/components/todo/todo-search/todo-search";
import { getTodos } from "@/actions/todo";

interface PageProps {
  searchParams: TodoSearchParams;
}

const TodoPage = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions);
  console.log("session at todo page", session);

  if (!session) {
    redirect("/login");
  }
  const data = await getTodos(searchParams);

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

        <Group justify="space-between" mb={"md"}>
          <TodoAddForm />
          <TodoSearch />
        </Group>

        <TodoList todoData={data as TodoResponse} />
      </Paper>
    </Container>
  );
};

export default TodoPage;
