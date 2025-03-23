"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import RadioSelector from "../RadioSelector";

// const FormSchema = z
//   .object({
//     username: z.string().min(1, "Username is required").max(100),
//     email: z.string().min(1, "Email is required").email("Invalid email"),
//     password: z
//       .string()
//       .min(1, "Password is required")
//       .min(8, "Password must have than 8 characters"),
//     confirmPassword: z.string().min(1, "Password confirmation is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Password do not match",
//   });

const SignUpForm = () => {
  //   const [loading, setLoading] = useState(false);
  //   const { toast } = useToast();

  //   const form = useForm<z.infer<typeof FormSchema>>({
  //     resolver: zodResolver(FormSchema),
  //     defaultValues: {
  //       username: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //     },
  //   });

  //   const onSubmit = async (values: z.infer<typeof FormSchema>) => {
  //     setLoading(true);
  //     const response = await signUp({
  //       username: values.username,
  //       email: values.email,
  //       password: values.password,
  //     });

  //     setLoading(false);

  //     if (!response.error) {
  //       redirect("/sign-in");
  //     } else {
  //       return toast({
  //         title: "Error",
  //         description: "Oops! Qualcosa è andato storto. Riprova.",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  const [selectedService, setSelectedService] = useState<string>("");
  const router = useRouter();

  return (
    <>
      <h2 className="heading mb-2">Registrazione</h2>
      <p className="subheading mb-5">
        Seleziona la tipologia di utente e procedi con il processo di
        registrazione
      </p>
      <RadioGroup defaultValue={selectedService}>
        <RadioSelector
          label="Servizio accogliente"
          value="servizio-accogliente"
          id="servizio-accogliente"
          onClick={() => setSelectedService("servizio-accogliente")}
        />
        <RadioSelector
          label="Servizio inviante"
          value="servizio-inviante"
          id="servizio-inviante"
          onClick={() => setSelectedService("servizio-inviante")}
        />
      </RadioGroup>
      <Button
        className="w-full mt-6 relative"
        type="submit"
        disabled={selectedService === ""}
        onClick={() => router.push(`/registrazione/${selectedService}`)} // Disable button when loading
      >
        Registrati
      </Button>

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-Enter your password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full mt-6 relative"
            type="submit"
            disabled={loading} // Disable button when loading
          >
            {loading ? <Loader /> : "Sign up"}
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          If you already have an account, please&nbsp;
          <Link className="text-primary hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </Form> */}
    </>
  );
};

export default SignUpForm;
