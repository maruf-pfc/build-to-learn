/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NODE_ENV === "production"
      ? "http://localhost:3004"
      : "http://localhost:3004",
  generateRobotsTxt: true, // (optional)
  // ...other options
};
