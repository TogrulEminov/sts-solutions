// next.config.ts
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const isDev = process.env.NODE_ENV === "development";

const allowImage = [
  "i.ytimg.com",
  "i.pinimg.com",
  "images.unsplash.com",
  "cdn.sanity.io",
  "lh3.googleusercontent.com",
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,

  // ========================================
  // 🖼️ IMAGE OPTIMIZATION
  // ========================================
  images: {
    remotePatterns: [
      ...allowImage.map((domain) => ({
        protocol: "https" as const,
        hostname: domain,
      })),
      {
        protocol: "https",
        hostname: isDev ? "" : "**.mlgroup.az",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 1024, 1920],
    minimumCacheTTL: isDev ? 0 : 3600,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ========================================
  // ⚙️ COMPILER SETTINGS
  // ========================================
  compress: true,
  poweredByHeader: false,

  compiler: {
    removeConsole: isDev ? false : { exclude: ["error", "warn"] },
  },

  // ========================================
  // 🚀 EXPERIMENTAL FEATURES
  // ========================================
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "react-hook-form",
      "zod",
      "@tanstack/react-query",
    ],

    serverActions: {
      bodySizeLimit: "5mb",
      allowedOrigins: [
        "http://localhost:3000",
        "https://togruleminov.online",
        "https://*.togruleminov.online",
      ],
    },

    staleTimes: {
      dynamic: isDev ? 0 : 30,
      static: isDev ? 0 : 180,
    },
  },

  // ========================================
  // 🔧 MODULAR IMPORTS
  // ========================================
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },

  // ========================================
  // 📄 STATIC GENERATION
  // ========================================
  staticPageGenerationTimeout: 180,

  // ========================================
  // 📦 TRANSPILE PACKAGES
  // ========================================
  transpilePackages: [
    "d3",
    "d3-geo",
    "d3-selection",
    "d3-path",
    "d3-shape",
    "d3-scale",
    "d3-array",
    "d3-geo-projection",
    "three", // ✅ three.js əlavə edildi
    "@google/model-viewer", // ✅ model-viewer əlavə edildi
  ],

  // ========================================
  // 🔍 LINTING
  // ========================================
  typescript: {
    ignoreBuildErrors: false,
  },

  // ========================================
  // 📦 WEBPACK CONFIGURATION
  // ========================================
  webpack: (config, { isServer, dev }) => {
    // ✅ Server-side: Leaflet-i ignore et
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        leaflet: false,
        "react-leaflet": false,
      };
    }

    // ✅ Client-side: three.js və model-viewer üçün alias
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false,
      };

      // ✅ three.js resolve
      config.resolve.alias = {
        ...config.resolve.alias,
        three: path.resolve("./node_modules/three"),
      };
    }

    // ✅ Bundle Analyzer (optional)
    if (!dev && !isServer && process.env.ANALYZE === "true") {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "./analyze/client.html",
          openAnalyzer: false,
        })
      );
    }

    return config;
  },

  // ========================================
  // 🔒 SECURITY HEADERS
  // ========================================
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-store, max-age=0"
              : "public, max-age=3600, immutable",
          },
        ],
      },
      {
        source: "/:path*.xml",
        headers: [
          { key: "Content-Type", value: "application/xml" },
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          { key: "Content-Type", value: "application/json" },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-cache, no-store, must-revalidate"
              : "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(png|jpg|jpeg|gif|webp|avif|ico|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-store, max-age=0"
              : "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-store, max-age=0"
              : "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
});

export default withNextIntl(nextConfig);
