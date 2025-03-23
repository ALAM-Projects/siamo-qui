"use server";

import Posts from ".";
import { getPosts } from "@/app/api/(protected)/post/_controllers";

const PostsPage = async () => {
  const response = await getPosts();

  return <Posts posts={response?.posts} />;
};

export default PostsPage;
