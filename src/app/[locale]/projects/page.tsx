import React from "react";
import ProjectsPageContainer from "./_container/main";
import { connection } from "next/server";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
interface PageProps {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale,
    slug: "projects",
    customPath: "projects",
    dataType: "category",
    detail: false,
  });
}
export default async function ProjectsPage() {
  await connection();
  return <ProjectsPageContainer />;
}
