import { defaultActions } from "@/actions";

type SignUpPayload = {
  username: string;
  email: string;
  password: string;
};
export const signUp = async (payload: SignUpPayload) => {
  const result = await defaultActions.POST("/auth/sign-up", payload);

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
