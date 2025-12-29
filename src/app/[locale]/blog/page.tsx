import { connection } from "next/server";
import BlogPageContainer from "./_container/main";

export default async function BlogPage() {
  await connection();
  return <BlogPageContainer />;
}
