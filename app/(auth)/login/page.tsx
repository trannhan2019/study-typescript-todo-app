import { Center, Paper, Title } from "@mantine/core";
import classes from "./style.module.css";
import LoginForm from "@/components/auth/login-form/login-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.bgImage}></div>
      <div className={classes.form}>
        <Center h={"100%"} w={"100%"}>
          <Paper>
            <Title order={2} ta="center" mb={50}>
              Welcome back to Mantine!
            </Title>
            <LoginForm />
          </Paper>
        </Center>
      </div>
    </div>
  );
}
