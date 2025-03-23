import { defaultActions } from "@/actions";
import { ServizioAccoglienteSchema } from "@/schemas/servizio-accogliente";
import { z } from "zod";

type ServizioAccoglienteProps = z.infer<typeof ServizioAccoglienteSchema>;

export const signUpServizioAccogliente = async (
  payload: ServizioAccoglienteProps
) => {
  const result = await defaultActions.POST(
    "/auth/sign-up/servizio-accogliente",
    payload
  );

  return result;
};

type ResetPasswordPayload = {
  email: string;
  password: string;
  token: string;
};
export const resetPassword = async (payload: ResetPasswordPayload) => {
  const result = await defaultActions.POST("/auth/reset-password", payload);

  return result;
};

type VerifyTokenPayload = {
  token?: string;
};
export const verifyToken = async () => {
  const result = await defaultActions.POST("/auth/verify-token");

  return result;
};
