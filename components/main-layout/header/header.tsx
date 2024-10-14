"use client";

import Link from "next/link";
import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Menu,
  UnstyledButton,
  Avatar,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header.module.css";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { IconChevronDown, IconHeart, IconPower } from "@tabler/icons-react";
import { useRouter } from "next-nprogress-bar";

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const router = useRouter();

  const { data: session } = useSession();
  // console.log(session);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const menuUser = () => {
    return (
      <Menu shadow="md" width={260}>
        <Menu.Target>
          <UnstyledButton>
            <Group>
              <Avatar
                src={"https://github.com/creativetimofficial.png"}
                size={20}
              />
              <Text>{session?.user.name}</Text>
              <IconChevronDown
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconPower style={{ width: rem(16) }} />}
            onClick={handleLogout}
          >
            Log out
          </Menu.Item>
          <Menu.Item
            component={Link}
            href={"/dashboard"}
            leftSection={
              <IconHeart
                style={{ width: rem(16), height: rem(16) }}
                color={"red"}
                stroke={1.5}
              />
            }
          >
            Dashboard
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };

  return (
    <Box>
      <Box component="header" h={64} px={"md"}>
        <Group justify="space-between" h="100%">
          <Image src={"/meta-48.svg"} alt="Meta logo" height={48} width={48} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href={"/"} className={classes.link}>
              Home
            </Link>
            <Link href={"/book"} className={classes.link}>
              Book
            </Link>
            <Link href={"/todo"} className={classes.link}>
              Todo
            </Link>
            <Link href={"/about"} className={classes.link}>
              About
            </Link>
          </Group>

          {session?.user ? (
            menuUser()
          ) : (
            <Group visibleFrom="sm">
              <Button variant="default" component={Link} href={"/login"}>
                Log in
              </Button>
              <Button component={Link} href={"/register"}>
                Sign up
              </Button>
            </Group>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </Box>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href={"/"} className={classes.link}>
            Home
          </Link>
          <Link href={"/todo"} className={classes.link}>
            Todo
          </Link>
          <Link href={"/about"} className={classes.link}>
            About
          </Link>

          <Divider my="sm" />
          {session?.user ? null : (
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button component={Link} href={"/register"}>
                Sign up
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Header;
