"use client";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";

type UnauthorizedProps = {
  session?: Session;
};

const Unauthorized: FC<UnauthorizedProps> = ({ session }) => {
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="mx-auto flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-triangle-alert"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-primary">
        Non sei autorizzato a visualizzare i contenuti di questa pagina.
      </h1>
      {session ? (
        <>
          <div className="mt-1 text-xl text-neutral-400 font-medium">
            Clicca sul bottone per tornare alla homepage
          </div>
          <div className="mt-5 flex justify-center">
            <Button className="w-[180px]" onClick={() => router.replace("/")}>
              Torna alla homepage
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-1 text-xl text-neutral-400 font-medium">
            Clicca sul bottone per effettuare il login
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              className="w-[150px]"
              onClick={() => router.replace("/sign-in")}
            >
              Effettua login
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Unauthorized;
