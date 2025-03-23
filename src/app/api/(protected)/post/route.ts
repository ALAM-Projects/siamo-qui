import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { validateAccessToken } from "@/lib/validateAccessToken";

export async function GET(req: Request) {
  try {
    const roles = ["Admin"];

    const res = await validateAccessToken(req, roles);

    if (res.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (res.status === 403) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { user: null, error: "User id is required" },
        { status: 400 }
      );
    }

    // get user info from the session
    const posts = await db.post.findMany({
      where: {
        authorId: userId,
      },
    });

    if (!posts) {
      return NextResponse.json(
        { posts: [], error: "Posts not found" },
        { status: 404 }
      );
    }

    // return posts
    return NextResponse.json(
      {
        posts,
        message: "Posts found",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ posts: null, error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const roles = ["Admin"];

    const res = await validateAccessToken(req, roles);

    if (res.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (res.status === 403) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { user: null, error: "User id is required" },
        { status: 400 }
      );
    }

    // get user info from the session
    const post = await db.post.create({
      data: {
        authorId: userId,
        title: "New Post",
        content: "This is a new post",
      },
    });

    if (!post) {
      return NextResponse.json(
        { posts: [], error: "Posts not found" },
        { status: 404 }
      );
    }

    // return posts
    return NextResponse.json(
      {
        post,
        message: "Post created",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ posts: null, error: error }, { status: 500 });
  }
}
