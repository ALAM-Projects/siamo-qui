"use client";

import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Page = () => {
  const [currentTab, setCurrentTab] = useState("login");
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Tabs
        defaultValue={currentTab}
        className="w-[500px] mb-4"
        onValueChange={setCurrentTab}
      >
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value="registrazione">
            Registrazione
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="p-8 bg-neutral-100 rounded-md w-[500px] h-[400px]">
        <div className="w-full">
          {currentTab === "login" && <SignInForm />}
          {currentTab === "registrazione" && <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default Page;
