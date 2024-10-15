import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Container,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "./style.module.css";
// import Image from "next/image";
import Link from "next/link";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function BookHeader() {
  return (
    <div className={classes.header}>
      <Container className="h-full" size={"xl"}>
        <Group h={"100%"} justify="space-between">
          <Image src="/logo-book.png" alt="Logo Book" w={85} h={53} />
          <Group h={"100%"} visibleFrom="sm">
            <Link href={"/"} className={classes.link}>
              Home
            </Link>
            <Link href={"/todo"} className={classes.link}>
              Todo
            </Link>
            {/* mega menu */}

            {/* mega menu */}
            <Link href={"/about"} className={classes.link}>
              About
            </Link>
          </Group>
          <Group visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Burger hiddenFrom="sm" />
        </Group>
      </Container>
    </div>
  );
}
