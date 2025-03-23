import { defaultActions } from "@/actions";
import { NextResponse } from "next/server";

type ResetEmailPayload = {
  email: string;
};

export const sendResetPasswordEmail = async (payload: ResetEmailPayload) => {
  const result = await defaultActions.POST("/email/reset-password", payload);
  if (result) {
    return NextResponse.json(result);
  } else
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
};
