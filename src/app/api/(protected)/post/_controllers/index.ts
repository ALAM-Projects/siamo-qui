import { defaultActions } from "../../../../../actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getPosts = async () => {
  const session = await getServerSession(authOptions);

  const result = await defaultActions.GET(
    "/post",
    session?.user,
    session?.accessToken
  );

  return result;
};
