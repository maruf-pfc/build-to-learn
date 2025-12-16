const request = require("supertest");
const app = require("../../../app");
const User = require("../user.model");
const {
  createTestUser,
  createTestUsers,
} = require("../../../tests/helpers/auth.helpers");
const { authPatch, authGet, authDelete } = require("../../../tests/helpers/test.helpers");

describe("Users API - Integration Tests", () => {
  describe("GET /api/users/leaderboard", () => {
    it("should return top 10 users by points", async () => {
      // Create users with different points
      for (let i = 0; i < 15; i++) {
        await createTestUser({
          name: `User ${i}`,
          email: `user${i}-${Date.now()}@example.com`,
          points: i * 10,
        });
      }

      const res = await request(app).get("/api/users/leaderboard");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeLessThanOrEqual(10);

      // Check sorted by points descending
      for (let i = 0; i < res.body.length - 1; i++) {
        expect(res.body[i].points).toBeGreaterThanOrEqual(
          res.body[i + 1].points,
        );
      }

      // Check only necessary fields returned
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("avatar");
      expect(res.body[0]).toHaveProperty("points");
    });

    it("should return empty array when no users", async () => {
      await User.deleteMany({});

      const res = await request(app).get("/api/users/leaderboard");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("GET /api/users", () => {
    it("should return all users for admin", async () => {
      const { admin } = await createTestUsers();

      // Create additional users
      await createTestUser();
      await createTestUser();

      const res = await authGet(app, "/api/users", admin.token);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(3);

      // Check passwordHash is not included
      res.body.forEach((user) => {
        expect(user).not.toHaveProperty("passwordHash");
      });
    });

    it("should reject non-admin users", async () => {
      const { student } = await createTestUsers();

      const res = await authGet(app, "/api/users", student.token);

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe("Admin only");
    });

    it("should reject unauthenticated requests", async () => {
      const res = await request(app).get("/api/users");

      expect(res.statusCode).toBe(401);
    });
  });

  describe("PATCH /api/users/:userId/role", () => {
    it("should update user role as admin", async () => {
      const { admin } = await createTestUsers();
      const { user, userId } = await createTestUser({ role: "student" });

      const res = await authPatch(app, `/api/users/${userId}/role`, admin.token)
        .send({ role: "instructor" });

      expect(res.statusCode).toBe(200);
      expect(res.body.role).toBe("instructor");

      // Verify in database
      const updatedUser = await User.findById(userId);
      expect(updatedUser.role).toBe("instructor");
    });

    it("should reject invalid role", async () => {
      const { admin } = await createTestUsers();
      const { userId } = await createTestUser();

      const res = await authPatch(app, `/api/users/${userId}/role`, admin.token)
        .send({ role: "superadmin" });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid role");
    });

    it("should reject non-admin users", async () => {
      const { student } = await createTestUsers();
      const { userId } = await createTestUser();

      const res = await authPatch(app, `/api/users/${userId}/role`, student.token)
        .send({ role: "instructor" });

      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe("Admin only");
    });
  });

  describe("PATCH /api/users/me", () => {
    it("should update user profile", async () => {
      const { token, userId } = await createTestUser();

      const updates = {
        bio: "Updated bio",
        headline: "Software Developer",
        skills: ["JavaScript", "Node.js"],
        socialLinks: {
          github: "https://github.com/testuser",
        },
      };

      const res = await request(app)
        .put("/api/users/me")
        .set("Authorization", `Bearer ${token}`)
        .send(updates);

      expect(res.statusCode).toBe(200);
      expect(res.body.bio).toBe(updates.bio);
      expect(res.body.headline).toBe(updates.headline);
      expect(res.body.skills).toEqual(updates.skills);
      expect(res.body.socialLinks.github).toBe(updates.socialLinks.github);
    });

    it("should not allow updating role", async () => {
      const { token, userId } = await createTestUser({ role: "student" });

      const res = await request(app)
        .put("/api/users/me")
        .set("Authorization", `Bearer ${token}`)
        .send({
          role: "admin",
        });

      expect(res.statusCode).toBe(200);

      const user = await User.findById(userId);
      expect(user.role).toBe("student");
    });

    it("should not allow updating email", async () => {
      const { token, userId, user } = await createTestUser();
      const originalEmail = user.email;

      const res = await request(app)
        .put("/api/users/me")
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: "newemail@example.com",
        });

      expect(res.statusCode).toBe(200);

      const updatedUser = await User.findById(userId);
      expect(updatedUser.email).toBe(originalEmail);
    });

    it("should not allow updating points", async () => {
      const { token, userId } = await createTestUser({ points: 100 });

      const res = await request(app)
        .put("/api/users/me")
        .set("Authorization", `Bearer ${token}`)
        .send({
          points: 9999,
        });

      expect(res.statusCode).toBe(200);

      const user = await User.findById(userId);
      expect(user.points).toBe(100);
    });

    it("should reject unauthenticated requests", async () => {
      const res = await request(app)
        .put("/api/users/me")
        .send({ bio: "Test" });

      expect(res.statusCode).toBe(401);
    });
  });

  describe("DELETE /api/users/me", () => {
    it("should delete user account", async () => {
      const { token, userId } = await createTestUser();

      const res = await authDelete(app, "/api/users/me", token);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Account deleted successfully");

      // Verify user is deleted
      const user = await User.findById(userId);
      expect(user).toBeNull();
    });

    it("should clear cookie on account deletion", async () => {
      const { token } = await createTestUser();

      const res = await authDelete(app, "/api/users/me", token);

      expect(res.statusCode).toBe(200);

      const cookies = res.headers["set-cookie"];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toContain("token=;");
    });

    it("should reject unauthenticated requests", async () => {
      const res = await request(app).delete("/api/users/me");

      expect(res.statusCode).toBe(401);
    });
  });
});
