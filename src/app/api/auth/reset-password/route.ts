"use server";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";
import { verifyJwtAccessToken } from "@/lib/token";
import bcrypt from "bcryptjs";

// define a schema for input validation
const ResetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
  token: z.string().min(1, "Token is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, token, password } = ResetPasswordSchema.parse(body);

    const isTokenValid = await verifyJwtAccessToken(token);

    if (!isTokenValid) {
      return NextResponse.json({ user: null, error: "Invalid token" });
    }
    // check if user with this email already exists
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
    if (!updatedUser) {
      return NextResponse.json(
        { user: null, error: "User with this email not found" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        user: updatedUser,
        message: "Password updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ user: null, error: error }, { status: 500 });
  }
}
