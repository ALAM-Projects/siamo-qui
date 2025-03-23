import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ThemeSelector } from "./ui/theme-selector";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className=" bg-primary py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          {session?.user?.username ? (
            <LogoutButton />
          ) : (
            <Link className={buttonVariants()} href="/sign-in">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
