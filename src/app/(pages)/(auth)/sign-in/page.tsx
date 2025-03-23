import SignInForm from "@/components/form/SignInForm";

const Page = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl mb-5 font-bold text-primary text-center">
        Inserisci le credenziali per accedere
      </h2>
      <SignInForm />
    </div>
  );
};

export default Page;
