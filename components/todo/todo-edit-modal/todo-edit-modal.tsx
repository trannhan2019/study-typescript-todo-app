"use client";

import { TodoType } from "@/types/todo.type";
import { todoEditSchema } from "@/schema/todo";
import { Button, Card, Group, Modal, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { z } from "zod";
import { editTodo } from "@/actions/todo";

interface TodoEditModalProps {
  opened: boolean;
  close: () => void;
  todo: TodoType;
}

interface FormValues extends z.infer<typeof todoEditSchema> {
  isCompleted: boolean;
}
const TodoEditModal = ({ opened, close, todo }: TodoEditModalProps & {}) => {
  // console.log("todo tai modal edit", todo);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  useEffect(() => {
    if (!opened) {
      form.reset();
    }
    form.setValues(todo);
  }, [opened]);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: todo?.title,
      isCompleted: Boolean(todo?.isCompleted) || false,
    },
    validate: zodResolver(todoEditSchema),
  });

  // console.log(form.values);

  const onSubmit = async (values: typeof form.values) => {
    startTransition(() => {
      editTodo(todo?.id, values).then((res) => {
        if (res?.error) {
          notifications.show({
            title: "Error",
            message: res.error,
            color: "red",
          });
        }
        if (res?.success) {
          close();
          form.reset();
          router.refresh();
          notifications.show({
            title: "Success",
            message: res.success,
            color: "green",
          });
        }
      });
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      centered
      title="Edit Todo"
    >
      <Card>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Card.Section>
            <TextInput
              label="Edit Title"
              key={form.key("title")}
              {...form.getInputProps("title")}
              // value={todo?.title as string}
            />
            <Switch
              label="Completed"
              key={form.key("isCompleted")}
              // checked={Boolean(form.values?.isCompleted)}
              {...(form.getInputProps("isCompleted"),
              {
                type: "checkbox",
                checked: Boolean(form.values?.isCompleted),
                onChange: (e) => {
                  form.setFieldValue("isCompleted", e.currentTarget.checked);
                },
              })}
              mt={10}
            />
            {/* <p> show {form.values.isCompleted ? "true" : "false"}</p> */}
          </Card.Section>
          <Card.Section mt={"md"}>
            <Group justify="flex-end">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" loading={isPending} variant="gradient">
                Save
              </Button>
            </Group>
          </Card.Section>
        </form>
      </Card>
    </Modal>
  );
};

export default TodoEditModal;
