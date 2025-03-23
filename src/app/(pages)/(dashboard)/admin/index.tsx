"use client";

import DownloadPdfButton from "@/components/DownloadPdfButton";
import { buttonVariants } from "@/components/ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";

type AdminProps = {
  session: Session;
};

const adminData = {
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  categories: {
    WEBSITE: {
      name: "WEBSITE",
      description: "Website design and development",
      services: {
        service1: {
          name: "pacchetto copywriting",
          price: 1500,
          time: 15,
        },
        service2: {
          name: "sviluppo sito web",
          price: 5000,
          time: 30,
        },
      },
    },
    "GRAPHIC DESIGN": {
      name: "GRAPHIC DESIGN",
      description: "Graphic design services",
      services: {
        service3: {
          name: "Manifesto / Roll-up / Espositore",
          price: 750,
          time: 18,
        },
      },
    },
  },
};

const Admin: FC<AdminProps> = ({ session }) => {
  return (
    <>
      <h2 className="text-2xl">Admin page - welcome back</h2>

      {JSON.stringify(session)}

      <Link className={buttonVariants()} href="/admin/posts">
        Vedi i miei post
      </Link>
      <DownloadPdfButton data={adminData} />
    </>
  );
};

export default Admin;
