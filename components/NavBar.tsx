import { auth, signOut, signIn } from "@/auth";
// import GitHub from "next-auth/providers/github";
// import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = async () => {
  const session = await auth();

  return (
    <div className="px-2 py-3 mx-0 my-0 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src={"/logo.jpg"} alt={"logo"} width={100} height={20} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Log Out</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span className="text-blue-700" >{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
