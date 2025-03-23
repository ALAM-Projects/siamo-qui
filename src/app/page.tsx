import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  // const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="text-4xl">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Go to admin page
      </Link>

      {/* <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {session ? <pre>{JSON.stringify(session)}</pre> : "No session"} */}
    </>
  );
}
