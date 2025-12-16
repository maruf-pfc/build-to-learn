const authService = require("../auth.service");
const User = require("../../users/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("Auth Service - Unit Tests", () => {
  describe("register", () => {
    it("should register a new student user", async () => {
      const userData = {
        name: "John Doe",
        email: `john${Date.now()}@example.com`,
        password: "password123",
        role: "student",
      };

      const result = await authService.register(userData);

      expect(result).toHaveProperty("token");
      expect(result).toHaveProperty("user");
      expect(result.user.email).toBe(userData.email);
      expect(result.user.role).toBe("student");
      expect(result.user).not.toHaveProperty("passwordHash");
    });

    it("should register a new instructor user", async () => {
      const userData = {
        name: "Jane Instructor",
        email: `jane${Date.now()}@example.com`,
        password: "password123",
        role: "instructor",
      };

      const result = await authService.register(userData);

      expect(result.user.role).toBe("instructor");
    });

    it("should throw error for duplicate email", async () => {
      const email = `duplicate${Date.now()}@example.com`;
      const userData = {
        name: "User One",
        email,
        password: "password123",
        role: "student",
      };

      await authService.register(userData);

      await expect(
        authService.register({ ...userData, name: "User Two" }),
      ).rejects.toThrow("Email already registered");
    });

    it("should throw error for invalid role", async () => {
      const userData = {
        name: "Invalid Role",
        email: `invalid${Date.now()}@example.com`,
        password: "password123",
        role: "superadmin",
      };

      await expect(authService.register(userData)).rejects.toThrow(
        "Invalid role selection",
      );
    });

    it("should hash password before saving", async () => {
      const userData = {
        name: "Password Test",
        email: `passtest${Date.now()}@example.com`,
        password: "password123",
        role: "student",
      };

      const result = await authService.register(userData);
      const user = await User.findById(result.user.id);

      expect(user.passwordHash).not.toBe(userData.password);
      const isMatch = await bcrypt.compare(userData.password, user.passwordHash);
      expect(isMatch).toBe(true);
    });
  });

  describe("login", () => {
    it("should login with valid credentials", async () => {
      const email = `login${Date.now()}@example.com`;
      const password = "password123";

      await authService.register({
        name: "Login Test",
        email,
        password,
        role: "student",
      });

      const result = await authService.login(email, password);

      expect(result).toHaveProperty("token");
      expect(result).toHaveProperty("user");
      expect(result.user.email).toBe(email);
    });

    it("should throw error for non-existent user", async () => {
      await expect(
        authService.login("nonexistent@example.com", "password123"),
      ).rejects.toThrow("Invalid credentials");
    });

    it("should throw error for incorrect password", async () => {
      const email = `wrongpass${Date.now()}@example.com`;

      await authService.register({
        name: "Wrong Pass Test",
        email,
        password: "correctpassword",
        role: "student",
      });

      await expect(
        authService.login(email, "wrongpassword"),
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("generateToken", () => {
    it("should generate valid JWT token", async () => {
      const user = await User.create({
        name: "Token Test",
        email: `token${Date.now()}@example.com`,
        passwordHash: await bcrypt.hash("password123", 10),
        role: "student",
      });

      const result = authService.generateToken(user);

      expect(result).toHaveProperty("token");
      expect(typeof result.token).toBe("string");

      const decoded = jwt.verify(
        result.token,
        process.env.JWT_SECRET || "test-secret",
      );
      expect(decoded.id).toBe(user._id.toString());
      expect(decoded.role).toBe(user.role);
    });

    it("should include user data in response", async () => {
      const user = await User.create({
        name: "User Data Test",
        email: `userdata${Date.now()}@example.com`,
        passwordHash: await bcrypt.hash("password123", 10),
        role: "instructor",
        points: 100,
      });

      const result = authService.generateToken(user);

      expect(result.user).toEqual({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        points: user.points,
      });
    });
  });
});
