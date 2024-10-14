"use client";

import { BookFooter } from "@/components/book/footer";
import { BookHeader } from "@/components/book/header";
import { AppShell } from "@mantine/core";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={{ height: 85 }}>
      <AppShell.Header>
        <BookHeader />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <BookFooter />
      </AppShell.Footer>
    </AppShell>
  );
}
