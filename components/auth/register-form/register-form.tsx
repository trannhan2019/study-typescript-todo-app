"use client";

import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { authRegisterSchema } from "@/schema/auth";
import { useTransition } from "react";
import { register } from "@/actions/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    validate: zodResolver(authRegisterSchema),
  });
  const handleSubmit = async (values: typeof form.values) => {
    // console.log(values);
    startTransition(() => {
      register(values).then((res) => {
        if (res?.error) {
          notifications.show({
            color: "red",
            title: "Error",
            message: res.error,
            position: "top-right",
          });
        }
        if (res?.success) {
          notifications.show({
            color: "green",
            title: "Success",
            message: res.success,
            position: "top-right",
          });
          router.push("/login");
          form.reset();
        }
      });
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Full name"
        placeholder="yourname"
        required
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Username"
        mt={"md"}
        required
        key={form.key("username")}
        {...form.getInputProps("username")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Button type="submit" fullWidth mt="xl" loading={isPending}>
        Sign in
      </Button>
    </form>
  );
}
