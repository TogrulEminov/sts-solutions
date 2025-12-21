import React from "react";
import ProjectsPageContainer from "./_container/main";
import { connection } from "next/server";

export default async function ProjectsPage() {
  await connection();
  return <ProjectsPageContainer />;
}
