import { Anchor, Container, Group, Paper, Title } from "@mantine/core";
import Link from "next/link";
import TodoAddForm from "./TodoAddForm/TodoAddForm";

import { TodoSearchParams } from "@/types/todo.type";
import TodoList from "./TodoList/ToddoList";
import TodoSearch from "./TodoSearch/TodoSearch";

interface PageProps {
  searchParams: TodoSearchParams;
}

const TodoPage = async ({ searchParams }: PageProps) => {
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
        <TodoList searchParams={searchParams} />
      </Paper>
    </Container>
  );
};

export default TodoPage;
