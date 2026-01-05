// app/manifest.json/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    short_name: "STS Solutions",
    name: "STS Solutions | Texniki Həllər və Xidmətlər",
    description:
      "STS Solutions, qida sənayesi, lojistika, enerji və alternativ enerji, su təsərrüfatı, kənd təsərrüfatı sektorlarında texniki həllərin təqdim edilməsi və icrası sahələrində uzun illər təcrübəyə malik professional mühəndis komandası ilə yüksək keyfiyyətli xidmətlər və həllər təklif edir.",
    start_url: "/",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    background_color: "#004A52",
    theme_color: "#1BAFBF",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    lang: "az",
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
