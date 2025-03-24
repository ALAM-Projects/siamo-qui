"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Loader from "../Loader";

const SignInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInFormSchema>) => {
    setLoading(true);
    // TODO: nella response far ritornare il tipo di utente, per poi fare redirec corrispondente
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setLoading(false); // Set loading to false after the response

    if (response && !response.error) {
      router.push("/admin");
      router.refresh();
    } else {
      return toast({
        title: "Errore",
        description: "Oops! Qualcosa è andato storto. Riprova.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <h2 className="heading mb-2">Login</h2>
      <p className="subheading mb-5">
        Inserisci le tue credenziali per accedere
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Inserisci la tua email" {...field} />
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
                      placeholder="Inserisci la tua password"
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
            {loading ? <Loader /> : "Accedi"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-2">
          Non ricordi la tua password? Clicca{" "}
          <Link
            className="text-primary hover:underline font-medium"
            href="/reset-password"
          >
            qui{" "}
          </Link>
          per iniziare il processo di reset.
        </p>
      </Form>
    </>
  );
};

export default SignInForm;
