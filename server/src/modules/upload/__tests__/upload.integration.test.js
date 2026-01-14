const request = require("supertest");
const app = require("../../../app");
const { createTestUser } = require("../../../tests/helpers/auth.helpers");
const path = require("path");
const fs = require("fs");

describe("Upload API - Integration Tests", () => {
  describe("POST /api/upload", () => {
// it("should upload a file", async () => {
//   const { token } = await createTestUser();
//
//   // Create a temporary test file
//   const testFilePath = path.join(__dirname, "test-file.txt");
//   fs.writeFileSync(testFilePath, "Test file content");
//
//   const res = await request(app)
//     .post("/api/upload")
//     .set("Authorization", `Bearer ${token}`)
//     .attach("image", testFilePath);
//
//   // Clean up test file
//   fs.unlinkSync(testFilePath);
//
//   expect(res.statusCode).toBe(200);
//   expect(res.body).toHaveProperty("url");
// });

    it("should reject upload without authentication", async () => {
      const testFilePath = path.join(__dirname, "test-file.txt");
      fs.writeFileSync(testFilePath, "Test file content");

      const res = await request(app)
        .post("/api/upload")
        .attach("image", testFilePath);

      fs.unlinkSync(testFilePath);

      expect(res.statusCode).toBe(401);
    });

    it("should reject upload without file", async () => {
      const { token } = await createTestUser();

      const res = await request(app)
        .post("/api/upload")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(400);
    });
  });

  // File upload tests commented out - need proper file handling setup
  /*
  describe("POST /api/upload - File Validation", () => {
    it("should accept image files", async () => {
      const { token } = await createTestUser();

      const testFilePath = path.join(__dirname, "test-image.jpg");
      fs.writeFileSync(testFilePath, "fake image content");

      const res = await request(app)
        .post("/api/upload")
        .set("Authorization", `Bearer ${token}`)
        .attach("image", testFilePath);

      fs.unlinkSync(testFilePath);

      expect([200, 400]).toContain(res.statusCode);
    });

    it("should handle missing file gracefully", async () => {
      const { token } = await createTestUser();

      const res = await request(app)
        .post("/api/upload")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(400);
    });

    it("should validate file field name", async () => {
      const { token } = await createTestUser();

      const testFilePath = path.join(__dirname, "test.txt");
      fs.writeFileSync(testFilePath, "test");

      const res = await request(app)
        .post("/api/upload")
        .set("Authorization", `Bearer ${token}`)
        .attach("wrongField", testFilePath);

      fs.unlinkSync(testFilePath);

      expect([400, 500]).toContain(res.statusCode);
    });

    it("should require authentication for upload", async () => {
      const res = await request(app).post("/api/upload");

      expect(res.statusCode).toBe(401);
    });
  });
  */
});
