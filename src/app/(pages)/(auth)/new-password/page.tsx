import ResetPasswordForm from "@/components/form/ResetPasswordForm";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl mb-5 font-bold text-primary text-center">
        Inserisci e conferma la nuova password
      </h2>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default Page;
