/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NODE_ENV === "production"
      ? "http://localhost:3000"
      : "http://localhost:3000",
  generateRobotsTxt: true, // (optional)
  // ...other options
};
