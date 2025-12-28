import { connection } from "next/server";
import SolutionsMainPageContainer from "./_container/main";

export default async function SolutionsPage() {
    await connection()
  return <SolutionsMainPageContainer />;
}
