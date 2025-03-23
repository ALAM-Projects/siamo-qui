import SignUpForm from "@/components/form/SignUpForm";

const page = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl mb-5 font-bold text-primary text-center">
        Inserisci i dati richiesti per registrarti alla piattaforma
      </h2>
      <SignUpForm />
    </div>
  );
};

export default page;
