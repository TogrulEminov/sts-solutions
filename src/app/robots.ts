// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: [
      {
        // ✅ Ümumi Botlar
        userAgent: "*",
        allow: [
          "/",
          "/*.js$",
          "/*.css$",
          "/*.jpg$",
          "/*.jpeg$",
          "/*.png$",
          "/*.gif$",
          "/*.svg$",
          "/*.webp$",
          "/*.avif$",
        ],
        disallow: [
          "/manage",
          "/manage/*",
          "/auth/*",
          "/api/*",
          "/_next/static/*",
          "/temp/*",
        ],
        crawlDelay: 1, // ✅ Server yükünü azaldır
      },
      {
        // ✅ Googlebot - tam giriş
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/manage/*", "/auth/*", "/api/*"],
      },
      {
        // ✅ Google Image Bot
        userAgent: "Googlebot-Image",
        allow: ["/", "/_next/image", "/_next/static/media"],
        disallow: ["/manage/*", "/auth/*"],
      },
      {
        // ✅ Bingbot
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/manage/*", "/auth/*", "/api/*"],
        crawlDelay: 2,
      },
      {
        // ✅ Yandex
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/manage/*", "/auth/*", "/api/*"],
        crawlDelay: 2,
      },
      {
        // ❌ Zərərli botlar - tam blok
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "DotBot",
          "MJ12bot",
          "BLEXBot",
          "DataForSeoBot",
          "PetalBot",
          "MegaIndex",
          "Cliqzbot",
          "CCBot", // ✅ AI training botu
          "GPTBot", // ✅ OpenAI botu
          "ChatGPT-User", // ✅ ChatGPT botu
          "anthropic-ai", // ✅ Claude botu
          "Claude-Web", // ✅ Claude web scraper
          "cohere-ai", // ✅ Cohere botu
          "Omgilibot", // ✅ AI training
          "FacebookBot", // ✅ Meta scraper
          "Bytespider", // ✅ ByteDance (TikTok)
          "PerplexityBot", // ✅ Perplexity AI
        ],
        disallow: "/",
      },
    ],

    // ✅ Sitemap
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-az.xml`,
      `${baseUrl}/sitemap-en.xml`,
      `${baseUrl}/sitemap-ru.xml`,
    ],

    // ✅ Host (optional, amma yaxşıdır)
    host: baseUrl,
  };
}