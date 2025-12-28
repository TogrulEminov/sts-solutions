import React from "react";
import SolutionsDetailContainer from "../_container/details";
import { connection } from "next/server";

export default  async function SoluitionDetailPage() {
    await connection()
  return <SolutionsDetailContainer />;
}
