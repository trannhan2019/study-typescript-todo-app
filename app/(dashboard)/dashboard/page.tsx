import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user?.role !== "ADMIN")
    return <div> You are not allowed to view this page</div>;

  return <div>Dashboard</div>;
}
