const request = require("supertest");
const app = require("../../../app");
const User = require("../../users/user.model");
const Course = require("../../course/course.model");
const { createTestUsers, createTestUser } = require("../../../tests/helpers/auth.helpers");
const { mockCourseData } = require("../../../tests/helpers/mock-data");
const { authGet, authPatch } = require("../../../tests/helpers/test.helpers");

describe("Admin API - Integration Tests", () => {
  describe("GET /api/admin/stats", () => {
    it("should return dashboard statistics for admin", async () => {
      const { admin, instructor } = await createTestUsers();

      // Create some data
      await createTestUser();
      await Course.create(
        mockCourseData(instructor.userId, {
          slug: `stats-course-${Date.now()}`,
        }),
      );

      const res = await authGet(app, "/api/admin/stats", admin.token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("totalUsers");
      expect(res.body).toHaveProperty("totalCourses");
      expect(typeof res.body.totalUsers).toBe("number");
      expect(typeof res.body.totalCourses).toBe("number");
    });

    it("should reject non-admin users", async () => {
      const { student } = await createTestUsers();

      const res = await authGet(app, "/api/admin/stats", student.token);

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toContain("Admin access required");
    });

    it("should reject unauthenticated requests", async () => {
      const res = await request(app).get("/api/admin/stats");

      expect(res.statusCode).toBe(401);
    });
  });

  describe("GET /api/admin/users", () => {
    it("should return all users for admin", async () => {
      const { admin } = await createTestUsers();

      await createTestUser();
      await createTestUser();

      const res = await authGet(app, "/api/admin/users", admin.token);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(3);
    });

    it("should reject non-admin users", async () => {
      const { instructor } = await createTestUsers();

      const res = await authGet(app, "/api/admin/users", instructor.token);

      expect(res.statusCode).toBe(403);
    });
  });

  describe("PUT /api/admin/users/role", () => {
    it("should update user role as admin", async () => {
      const { admin } = await createTestUsers();
      const { userId } = await createTestUser({ role: "student" });

      const res = await request(app)
        .put("/api/admin/users/role")
        .set("Authorization", `Bearer ${admin.token}`)
        .send({
          userId,
          role: "instructor",
        });

      expect(res.statusCode).toBe(200);

      const user = await User.findById(userId);
      expect(user.role).toBe("instructor");
    });

    it("should reject non-admin users", async () => {
      const { student } = await createTestUsers();
      const { userId } = await createTestUser();

      const res = await request(app)
        .put("/api/admin/users/role")
        .set("Authorization", `Bearer ${student.token}`)
        .send({
          userId,
          role: "instructor",
        });

      expect(res.statusCode).toBe(403);
    });
  });
});
