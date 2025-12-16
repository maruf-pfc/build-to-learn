const jwt = require("jsonwebtoken");
const User = require("../../modules/users/user.model");

/**
 * Generate a valid JWT token for testing
 */
const generateToken = (userId, role = "student") => {
  const payload = { id: userId, role };
  return jwt.sign(payload, process.env.JWT_SECRET || "test-secret", {
    expiresIn: "7d",
  });
};

/**
 * Create a test user and return user object with token
 */
const createTestUser = async (overrides = {}) => {
  const bcrypt = require("bcryptjs");
  const defaultUser = {
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    passwordHash: await bcrypt.hash("password123", 10),
    role: "student",
    ...overrides,
  };

  const user = await User.create(defaultUser);
  const token = generateToken(user._id, user.role);

  return {
    user,
    token,
    userId: user._id.toString(),
  };
};

/**
 * Create multiple test users with different roles
 */
const createTestUsers = async () => {
  const student = await createTestUser({
    name: "Student User",
    email: `student${Date.now()}@example.com`,
    role: "student",
  });

  const instructor = await createTestUser({
    name: "Instructor User",
    email: `instructor${Date.now()}@example.com`,
    role: "instructor",
  });

  const admin = await createTestUser({
    name: "Admin User",
    email: `admin${Date.now()}@example.com`,
    role: "admin",
  });

  return { student, instructor, admin };
};

/**
 * Get authorization header with token
 */
const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

/**
 * Create a cookie string for testing
 */
const createCookie = (token) => `token=${token}`;

module.exports = {
  generateToken,
  createTestUser,
  createTestUsers,
  authHeader,
  createCookie,
};
