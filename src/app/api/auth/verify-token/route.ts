"use server";

import { NextResponse } from "next/server";
import { verifyJwtAccessToken } from "@/lib/token";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSession } from "next-auth/react";

export async function POST() {
  try {
    console.log("DENTROOOOOOOOOOOOOOOOOOOOOOOO");

    const session = await getSession();

    console.log("session", session);

    if (!session) {
      new URL("/sign-in");
      return NextResponse.json(
        { ok: false, error: "No session found" },
        { status: 401 }
      );
    }

    const isTokenValid = await verifyJwtAccessToken(session?.accessToken);

    if (!isTokenValid) {
      return NextResponse.json(
        { ok: false, error: "Invalid token" },
        { status: 401 }
      );
    }
    // check if user with this email already exists
    return NextResponse.json(
      {
        ok: true,
        message: "Token is valid",
        token: session.accessToken,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ ok: false, error: error }, { status: 500 });
  }
}
