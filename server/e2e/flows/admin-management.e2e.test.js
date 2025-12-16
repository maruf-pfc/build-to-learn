const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/modules/users/user.model");
const bcrypt = require("bcryptjs");

// Helper to extract token from cookie
const extractToken = (res) => {
  const cookies = res.headers["set-cookie"];
  if (!cookies) return null;
  const tokenCookie = cookies.find((c) => c.startsWith("token="));
  if (!tokenCookie) return null;
  return tokenCookie.split(";")[0].split("=")[1];
};

describe("E2E: Admin Management Flow", () => {
  it("should complete full admin journey: login → view stats → manage users → update roles", async () => {
    // Step 1: Create admin user directly (admins can't register via API)
    const adminPassword = "adminpass123";
    const admin = await User.create({
      name: "Admin User",
      email: `admin${Date.now()}@example.com`,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: "admin",
    });

    // Step 2: Login as admin
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: admin.email, password: adminPassword });

    expect(loginRes.statusCode).toBe(200);
    const token = extractToken(loginRes);

    // Step 3: Create some test users
    const student1 = await User.create({
      name: "Student One",
      email: `student1${Date.now()}@example.com`,
      passwordHash: await bcrypt.hash("password123", 10),
      role: "student",
    });

    const student2 = await User.create({
      name: "Student Two",
      email: `student2${Date.now()}@example.com`,
      passwordHash: await bcrypt.hash("password123", 10),
      role: "student",
    });

    // Step 4: View dashboard stats
    const statsRes = await request(app)
      .get("/api/admin/stats")
      .set("Authorization", `Bearer ${token}`);

    expect(statsRes.statusCode).toBe(200);
    expect(statsRes.body.totalUsers).toBeGreaterThanOrEqual(3);

    // Step 5: Get all users
    const usersRes = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${token}`);

    expect(usersRes.statusCode).toBe(200);
    expect(Array.isArray(usersRes.body)).toBe(true);
    expect(usersRes.body.length).toBeGreaterThanOrEqual(3);

    // Step 6: Update user role from student to instructor
    const updateRoleRes = await request(app)
      .put("/api/admin/users/role")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: student1._id.toString(),
        role: "instructor",
      });

    expect(updateRoleRes.statusCode).toBe(200);

    // Step 7: Verify role was updated
    const updatedUser = await User.findById(student1._id);
    expect(updatedUser.role).toBe("instructor");

    // Step 8: Verify non-admin cannot access admin endpoints
    const studentLoginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: student2.email, password: "password123" });

    const studentToken = extractToken(studentLoginRes);

    const unauthorizedRes = await request(app)
      .get("/api/admin/stats")
      .set("Authorization", `Bearer ${studentToken}`);

    expect(unauthorizedRes.statusCode).toBe(403);
    expect(unauthorizedRes.body.message).toContain("Admin access required");
  });
});
