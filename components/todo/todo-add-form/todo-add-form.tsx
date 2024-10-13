"use client";

import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { Box, Button, FocusTrap, Group, TextInput } from "@mantine/core";
import { todoAddSchema } from "@/schema/todo";
import { useRouter } from "next-nprogress-bar";
import { notifications } from "@mantine/notifications";
import { useTransition } from "react";
import { addTodo } from "@/actions/todo";

export type FormValues = z.infer<typeof todoAddSchema>;

const TodoAddForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
    validate: zodResolver(todoAddSchema),
  });

  const onSubmit = async (values: FormValues) => {
    startTransition(() => {
      addTodo(values).then((res) => {
        if (res?.error) {
          notifications.show({
            title: "Error",
            message: res.error,
            color: "red",
          });
        }
        if (res?.success) {
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
    <Box>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group align="center">
          <FocusTrap>
            <TextInput
              placeholder="Add Todo"
              key={form.key("title")}
              {...form.getInputProps("title")}
            />
          </FocusTrap>
          <Button size="sm" loading={isPending} type="submit">
            Add Todo
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default TodoAddForm;
