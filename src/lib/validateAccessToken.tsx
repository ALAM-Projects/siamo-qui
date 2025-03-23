import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function validateAccessToken(
  req: Request,
  requiredRoles?: string[]
) {
  try {
    const authHeader = req.headers.get("authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      return NextResponse.json({ error: "Any token found" }, { status: 401 });
    }

    const secretKey = process.env.SECRET_KEY;
    const decoded = await jwt.verify(accessToken, secretKey!);

    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles = (decoded as JwtPayload)?.role || [];
      const hasRequiredRole = requiredRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasRequiredRole) {
        return NextResponse.json(
          { error: "Forbidden: Insufficient permissions" },
          { status: 403 }
        );
      }
    }

    return decoded as JwtPayload; // Return the decoded token payload
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized", message: (error as Error).message },
      { status: 401 }
    );
  }
}
