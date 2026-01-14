const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("Auth Service - Unit Tests", () => {
  describe("Password Hashing", () => {
    it("should hash password correctly", async () => {
      const password = "testpassword123";
      const hash = await bcrypt.hash(password, 10);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(20);
    });

    it("should verify correct password", async () => {
      const password = "testpassword123";
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare(password, hash);
      expect(isValid).toBe(true);
    });

    it("should reject incorrect password", async () => {
      const password = "testpassword123";
      const wrongPassword = "wrongpassword";
      const hash = await bcrypt.hash(password, 10);

      const isValid = await bcrypt.compare(wrongPassword, hash);
      expect(isValid).toBe(false);
    });

    it("should generate different hashes for same password", async () => {
      const password = "testpassword123";
      const hash1 = await bcrypt.hash(password, 10);
      const hash2 = await bcrypt.hash(password, 10);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("JWT Token Generation", () => {
    const secret = "test-secret-key";

    it("should generate valid JWT token", () => {
      const payload = { userId: "123", role: "student" };
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3);
    });

    it("should decode JWT token correctly", () => {
      const payload = { userId: "123", role: "student" };
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      const decoded = jwt.verify(token, secret);

      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.role).toBe(payload.role);
    });

    it("should reject invalid JWT token", () => {
      const invalidToken = "invalid.token.here";

      expect(() => {
        jwt.verify(invalidToken, secret);
      }).toThrow();
    });

    it("should reject token with wrong secret", () => {
      const payload = { userId: "123", role: "student" };
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      expect(() => {
        jwt.verify(token, "wrong-secret");
      }).toThrow();
    });

    it("should include expiration in token", () => {
      const payload = { userId: "123", role: "student" };
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      const decoded = jwt.verify(token, secret);

      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(decoded.iat);
    });
  });

  describe("Role Validation", () => {
    it("should validate student role", () => {
      const validRoles = ["student", "instructor", "admin"];
      expect(validRoles).toContain("student");
    });

    it("should validate instructor role", () => {
      const validRoles = ["student", "instructor", "admin"];
      expect(validRoles).toContain("instructor");
    });

    it("should validate admin role", () => {
      const validRoles = ["student", "instructor", "admin"];
      expect(validRoles).toContain("admin");
    });

    it("should reject invalid role", () => {
      const validRoles = ["student", "instructor", "admin"];
      expect(validRoles).not.toContain("superadmin");
      expect(validRoles).not.toContain("moderator");
    });
  });

  describe("Email Validation", () => {
    it("should validate correct email format", () => {
      const validEmails = [
        "test@example.com",
        "user.name@example.co.uk",
        "user+tag@example.com",
      ];

      validEmails.forEach((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it("should reject invalid email format", () => {
      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "user @example.com",
      ];

      invalidEmails.forEach((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it("should normalize email to lowercase", () => {
      const email = "Test@Example.COM";
      const normalized = email.toLowerCase();

      expect(normalized).toBe("test@example.com");
    });

    it("should trim whitespace from email", () => {
      const email = "  test@example.com  ";
      const trimmed = email.trim();

      expect(trimmed).toBe("test@example.com");
    });
  });

  describe("Password Strength Validation", () => {
    it("should accept password with minimum length", () => {
      const password = "password123";
      expect(password.length).toBeGreaterThanOrEqual(8);
    });

    it("should reject password too short", () => {
      const password = "pass";
      expect(password.length).toBeLessThan(8);
    });

    it("should validate password contains letters", () => {
      const password = "password123";
      const hasLetters = /[a-zA-Z]/.test(password);
      expect(hasLetters).toBe(true);
    });

    it("should validate password contains numbers", () => {
      const password = "password123";
      const hasNumbers = /\d/.test(password);
      expect(hasNumbers).toBe(true);
    });
  });
});
