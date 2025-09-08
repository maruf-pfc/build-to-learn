import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex h-screen justify-center items-center gap-4">
      <ModeToggle />
      {session ? <p>Hello, {session.user.name}</p> : <Button>Logout</Button>}
    </div>
  );
}
