import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "80px" }}>
      <h1>Account</h1>
      <p>Welcome, {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <p>Role: {session.user?.role}</p>
    </div>
  );
}
