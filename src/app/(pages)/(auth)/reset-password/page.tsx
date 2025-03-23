import EmailForm from "@/components/form/EmailForm";

const Page = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl mb-5 font-bold text-primary text-center">
        Inserisci la tua email per procedere con il recupero password
      </h2>
      <EmailForm />
    </div>
  );
};

export default Page;
