const app = require("./app");
const connectDB = require("./db");
app.use("/api/courses", require("./modules/course/course.routes"));
app.use(
  "/api/certificates",
  require("./modules/certificate/certificate.routes"),
);
const PORT = process.env.PORT || 3340;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
});
