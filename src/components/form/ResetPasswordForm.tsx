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
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/app/api/auth/_controllers";

const FormSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
  // must match with password
  confirmPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const ResetPasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  // get token & email from query params
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (!token || !email) {
    return (
      <div className="text-center">
        <p>Invalid reset password link</p>
      </div>
    );
  }

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await resetPassword({
      email,
      token,
      password: values.password,
    });

    if (response?.error) {
      return toast({
        title: "Error",
        description: "Oops! Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: response?.message,
        variant: "success",
      });
      router.push("/sign-in");
      router.refresh();
    }
  };

  // const btnIsDisabled = useMemo(() => {
  //   if (confirmPassword !== password) {
  //     return true;
  //   }
  // }, [password, confirmPassword]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Reset password
        </Button>
      </form>
      {/* <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-primary hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default ResetPasswordForm;
