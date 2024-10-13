"use client";

import { TodoType } from "@/types/todo.type";
import {
  Button,
  ButtonGroup,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconCancel, IconEdit } from "@tabler/icons-react";
import TodoEditModal from "../todo-edit-modal/todo-edit-modal";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next-nprogress-bar";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { deleteTodo } from "@/actions/todo";

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      // onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        deleteTodo(todo.id).then((res) => {
          if (res?.error) {
            notifications.show({
              title: "Error",
              message: res.error,
              color: "red",
            });
          }
          if (res?.success) {
            router.refresh();
            notifications.show({
              title: "Success",
              message: res.success,
              color: "green",
            });
          }
        });
      },
    });

  return (
    <>
      <Group justify="space-between">
        <UnstyledButton variant="subtle">
          <Text py={10} c={todo.isCompleted ? "green" : ""}>
            {todo.title}
          </Text>
        </UnstyledButton>

        <ButtonGroup>
          <Button variant="white" onClick={open}>
            <IconEdit size={18} />
          </Button>
          <Button variant="white" onClick={openDeleteModal}>
            <IconCancel size={18} color="red" />
          </Button>
        </ButtonGroup>
      </Group>

      {/* Edit Modal */}
      <TodoEditModal opened={opened} close={close} todo={todo} />
    </>
  );
};

export default Todo;
