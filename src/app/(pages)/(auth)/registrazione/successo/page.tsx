import { Check } from "lucide-react";

const Page = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-20 h-20 flex justify-center items-center rounded-full bg-green-100 mb-4">
        <Check className="w-12 h-12 text-success" />
      </div>
      <div className="heading mb-2">Registrazione avvenuta con successo!</div>
      <div className="subheading max-w-[500px] text-center">
        Riceverai una mail con le credenziali di accesso quando uno dei nostri
        Admin accetterà la tua richiesta di registrazione.
      </div>
      <div className="subheading mt-4">Puoi chiudere la seguente pagina.</div>
    </div>
  );
};

export default Page;
