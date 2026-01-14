const request = require("supertest");
const app = require("../../../app");
const User = require("../../users/user.model");
const { createTestUser } = require("../../../tests/helpers/auth.helpers");
const { extractCookie } = require("../../../tests/helpers/test.helpers");

describe("Auth API - Integration Tests", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new student", async () => {
      const userData = {
        name: "New Student",
        email: `student${Date.now()}@example.com`,
        password: "password123",
        role: "student",
      };

      const res = await request(app).post("/api/auth/register").send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user.email).toBe(userData.email);
      expect(res.body.user.role).toBe("student");
      expect(res.body.user).not.toHaveProperty("passwordHash");

      // Check cookie is set
      const cookie = extractCookie(res);
      expect(cookie).toBeDefined();
    });

    it("should register a new instructor", async () => {
      const userData = {
        name: "New Instructor",
        email: `instructor${Date.now()}@example.com`,
        password: "password123",
        role: "instructor",
      };

      const res = await request(app).post("/api/auth/register").send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.user.role).toBe("instructor");
    });

    it("should reject duplicate email", async () => {
      const email = `duplicate${Date.now()}@example.com`;
      const userData = {
        name: "User One",
        email,
        password: "password123",
        role: "student",
      };

      await request(app).post("/api/auth/register").send(userData);

      const res = await request(app)
        .post("/api/auth/register")
        .send({ ...userData, name: "User Two" });

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toContain("Email already registered");
    });

    it("should reject invalid role", async () => {
      const userData = {
        name: "Invalid Role",
        email: `invalid${Date.now()}@example.com`,
        password: "password123",
        role: "admin",
      };

      const res = await request(app).post("/api/auth/register").send(userData);

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain("Invalid role");
    });

    it("should reject missing required fields", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Incomplete User",
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const email = `login${Date.now()}@example.com`;
      const password = "password123";

      await request(app).post("/api/auth/register").send({
        name: "Login User",
        email,
        password,
        role: "student",
      });

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email, password });

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user.email).toBe(email);

      const cookie = extractCookie(res);
      expect(cookie).toBeDefined();
    });

    it("should reject invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nonexistent@example.com", password: "password123" });

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toContain("Invalid credentials");
    });

    it("should reject invalid password", async () => {
      const email = `wrongpass${Date.now()}@example.com`;

      await request(app).post("/api/auth/register").send({
        name: "Wrong Pass User",
        email,
        password: "correctpassword",
        role: "student",
      });

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email, password: "wrongpassword" });

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toContain("Invalid credentials");
    });
  });

  describe("GET /api/auth/me", () => {
    it("should return current user with valid token", async () => {
      const { token, user } = await createTestUser({
        name: "Me Test User",
        role: "student",
      });

      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(user._id.toString());
      expect(res.body.email).toBe(user.email);
      expect(res.body).not.toHaveProperty("passwordHash");
    });

    it("should return 401 without token", async () => {
      const res = await request(app).get("/api/auth/me");

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain("No token provided");
    });

    it("should return 401 with invalid token", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer invalidtoken");

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Unauthorized");
    });

    it("should include enrolled courses", async () => {
      const { token, user } = await createTestUser();

      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("enrolledCourses");
      expect(Array.isArray(res.body.enrolledCourses)).toBe(true);
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should clear cookie on logout", async () => {
      const { token } = await createTestUser();

      const res = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Logged out successfully");

      const cookies = res.headers["set-cookie"];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toContain("token=;");
    });
  });

  describe("POST /api/auth/register - Password Validation", () => {
    it("should reject weak passwords (too short)", async () => {
      const userData = {
        name: "Weak Password User",
        email: `weak-${Date.now()}@example.com`,
        password: "123",
        role: "student",
      };

      const res = await request(app).post("/api/auth/register").send(userData);

      // Assuming password validation is implemented
      expect([400, 500]).toContain(res.statusCode);
    });

    it("should accept strong passwords", async () => {
      const userData = {
        name: "Strong Password User",
        email: `strong-${Date.now()}@example.com`,
        password: "StrongP@ssw0rd123!",
        role: "student",
      };

      const res = await request(app).post("/api/auth/register").send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty("id");
    });
  });

  describe("POST /api/auth/register - Email Validation", () => {
    it("should reject invalid email format", async () => {
      const userData = {
        name: "Invalid Email User",
        email: "not-an-email",
        password: "password123",
        role: "student",
      };

      const res = await request(app).post("/api/auth/register").send(userData);

      expect([400, 500]).toContain(res.statusCode);
    });

    it("should normalize email to lowercase", async () => {
      const email = `MixedCase${Date.now()}@Example.COM`;
      const userData = {
        name: "Mixed Case Email",
        email,
        password: "password123",
        role: "student",
      };

      const res = await request(app).post("/api/auth/register").send(userData);

      expect(res.statusCode).toBe(200);
      expect(res.body.user.email).toBe(email.toLowerCase());
    });
  });

  describe("POST /api/auth/login - Case Insensitive", () => {
    it("should allow login with different email case", async () => {
      const email = `casetest${Date.now()}@example.com`;
      const password = "password123";

      await request(app).post("/api/auth/register").send({
        name: "Case Test User",
        email,
        password,
        role: "student",
      });

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: email.toUpperCase(), password });

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty("id");
    });
  });

  describe("GET /api/auth/me - Token Validation", () => {
    it("should reject malformed tokens", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer malformed.token.here");

      expect(res.statusCode).toBe(401);
    });

    it("should reject tokens without Bearer prefix", async () => {
      const { token } = await createTestUser();

      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", token);

      expect(res.statusCode).toBe(401);
    });

    it("should handle missing Authorization header", async () => {
      const res = await request(app).get("/api/auth/me");

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toContain("No token provided");
    });
  });
});
