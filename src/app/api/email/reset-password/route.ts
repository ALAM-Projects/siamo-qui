import { NextResponse } from "next/server";
import ResetPasswordEmail from "../../../../../react-email-starter/emails/reset-password";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { signJwtAccessToken } from "@/lib/token";
import { validateAccessToken } from "@/lib/validateAccessToken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const user = await db.user.findUnique({
      where: {
        email: email, // Use the passed email, not hardcoded
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = await signJwtAccessToken(user);

    const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}/new-password?email=${email}&token=${token}`;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset your password",
      react: ResetPasswordEmail({
        resetPasswordLink: resetPasswordLink,
      }),
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
