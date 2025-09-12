import Search from "../../components/search/Search";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// ✅ Use correct typing for Next.js App Router
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const query = typeof searchParams.query === "string" ? searchParams.query : "";
  const type = typeof searchParams.type === "string" ? searchParams.type : "windows";

  const sectionName = type === "mobile" ? "Mobile Tools" : "Windows Tools";

  const pageTitle = query
    ? `Search results for "${query}" in ${sectionName}`
    : `Search ${sectionName}`;

  const description = query
    ? `Find "${query}" in Kalifa OS ${sectionName}. Download and use trusted ${type} tools directly.`
    : `Browse and download ${sectionName} from Kalifa OS. Access trusted ${type} utilities easily.`;

  return {
    title: pageTitle,
    description,
    keywords: [
      "Kalifa OS",
      sectionName,
      "Download tools",
      "FRP tools",
      "Bypass tools",
      "Search tools",
      query,
    ],
  };
}

export default function Page() {
  return (
    <div>
      <Search />
    </div>
  );
}