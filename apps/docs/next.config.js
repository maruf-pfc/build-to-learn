/** @type {import('nextra').withNextra} */
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  latex: true,
});

/** @type {import('next').NextConfig} */
const NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all domains
        pathname: "/**", // Allows all paths
      },
    ],
  },
};

module.exports = withNextra(NextConfig);
