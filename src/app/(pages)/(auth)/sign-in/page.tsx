"use client";

import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

const Page = () => {
  const [currentTab, setCurrentTab] = useState("");

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", value);
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const tab = url.searchParams.get("tab");

    if (tab) {
      return setCurrentTab(tab);
    }
    return setCurrentTab("login");
  }, []);

  if (currentTab === "") {
    return null;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center px-8">
      <Tabs
        defaultValue={currentTab}
        className="w-full sm:w-[500px] mb-4"
        onValueChange={handleTabChange}
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
      <div className="p-8 bg-neutral-100 rounded-md w-full sm:w-[500px] h-[400px]">
        <div className="w-full">
          {currentTab === "login" && <SignInForm />}
          {currentTab === "registrazione" && <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default Page;
