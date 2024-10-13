import MainLayout from "@/components/main-layout/main-layout";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}
