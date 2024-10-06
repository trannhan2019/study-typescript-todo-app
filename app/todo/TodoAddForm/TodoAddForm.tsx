"use client";

import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { Button, FocusTrap, Group, TextInput } from "@mantine/core";
import { useState } from "react";
import { todoAddSchema } from "@/validation/todo";
import { useRouter } from "next/navigation";

export type FormValues = z.infer<typeof todoAddSchema>;

const TodoAddForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
    validate: zodResolver(todoAddSchema),
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      form.reset();
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log("Error while Registeing", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Group align="center">
        <FocusTrap>
          <TextInput
            placeholder="Add Todo"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
        </FocusTrap>
        <Button size="sm" loading={loading} type="submit">
          Add Todo
        </Button>
      </Group>
    </form>
  );
};

export default TodoAddForm;
