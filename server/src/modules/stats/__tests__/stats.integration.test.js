const request = require("supertest");
const app = require("../../../app");
const User = require("../../users/user.model");
const Course = require("../../course/course.model");
const Certificate = require("../../certificate/certificate.model");
const { mockCourseData } = require("../../../tests/helpers/mock-data");

describe("Stats API - Integration Tests", () => {
  describe("GET /api/stats/public", () => {
    it("should return all platform statistics", async () => {
      const res = await request(app).get("/api/stats/public");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("activeLearners");
      expect(res.body).toHaveProperty("courses");
      expect(res.body).toHaveProperty("certificatesIssued");
      expect(res.body).toHaveProperty("instructors");
      expect(typeof res.body.activeLearners).toBe("number");
      expect(typeof res.body.courses).toBe("number");
      expect(typeof res.body.certificatesIssued).toBe("number");
      expect(typeof res.body.instructors).toBe("number");
    });

    it("should accurately count learners", async () => {
      // Clear existing students
      await User.deleteMany({ role: "student" });

      // Create exactly 5 students
      for (let i = 0; i < 5; i++) {
        await User.create({
          name: `Student ${i}`,
          email: `student${i}-${Date.now()}@example.com`,
          passwordHash: "hashedpassword",
          role: "student",
        });
      }

      const res = await request(app).get("/api/stats/public");

      expect(res.statusCode).toBe(200);
      expect(res.body.activeLearners).toBe(5);
    });

    it("should accurately count courses", async () => {
      // Get initial count
      const initialRes = await request(app).get("/api/stats/public");
      const initialCount = initialRes.body.courses;

      // Create a test instructor
      const instructor = await User.create({
        name: "Test Instructor",
        email: `instructor-${Date.now()}@example.com`,
        passwordHash: "hashedpassword",
        role: "instructor",
      });

      // Create exactly 3 new courses
      for (let i = 0; i < 3; i++) {
        await Course.create(
          mockCourseData(instructor._id, {
            slug: `stats-course-${i}-${Date.now()}`,
          })
        );
      }

      const res = await request(app).get("/api/stats/public");

      expect(res.statusCode).toBe(200);
      expect(res.body.courses).toBe(initialCount + 3);
    });

    it("should accurately count certificates", async () => {
      // Get initial count
      const initialRes = await request(app).get("/api/stats/public");
      const initialCount = initialRes.body.certificatesIssued;

      // Create test data
      const student = await User.create({
        name: "Cert Student",
        email: `cert-student-${Date.now()}@example.com`,
        passwordHash: "hashedpassword",
        role: "student",
      });

      const instructor = await User.create({
        name: "Cert Instructor",
        email: `cert-instructor-${Date.now()}@example.com`,
        passwordHash: "hashedpassword",
        role: "instructor",
      });

      const course = await Course.create(
        mockCourseData(instructor._id, {
          slug: `cert-course-${Date.now()}`,
        })
      );

      // Create 2 certificates
      await Certificate.create({
        user: student._id,
        course: course._id,
        courseTitle: "Test Course",
        userName: "Cert Student",
        instructorName: "Cert Instructor",
        certificateId: `CERT-${Date.now()}-1`,
        issuedAt: new Date(),
      });

      await Certificate.create({
        user: student._id,
        course: course._id,
        courseTitle: "Test Course",
        userName: "Cert Student",
        instructorName: "Cert Instructor",
        certificateId: `CERT-${Date.now()}-2`,
        issuedAt: new Date(),
      });

      const res = await request(app).get("/api/stats/public");

      expect(res.statusCode).toBe(200);
      expect(res.body.certificatesIssued).toBe(initialCount + 2);
    });

    it("should accurately count instructors", async () => {
      // Clear existing instructors
      await User.deleteMany({ role: "instructor" });

      // Create exactly 3 instructors
      for (let i = 0; i < 3; i++) {
        await User.create({
          name: `Instructor ${i}`,
          email: `instructor${i}-${Date.now()}@example.com`,
          passwordHash: "hashedpassword",
          role: "instructor",
        });
      }

      const res = await request(app).get("/api/stats/public");

      expect(res.statusCode).toBe(200);
      expect(res.body.instructors).toBe(3);
    });

    it("should not count admins as learners or instructors", async () => {
      // Create an admin user
      await User.create({
        name: "Admin User",
        email: `admin-${Date.now()}@example.com`,
        passwordHash: "hashedpassword",
        role: "admin",
      });

      const res = await request(app).get("/api/stats/public");

      expect(res.statusCode).toBe(200);
      // Admin should not be counted in activeLearners or instructors
      expect(typeof res.body.activeLearners).toBe("number");
      expect(typeof res.body.instructors).toBe("number");
    });

    it("should return zero counts when database is empty", async () => {
      // Clear all data
      await User.deleteMany({});
      await Course.deleteMany({});
      await Certificate.deleteMany({});

      const res = await request(app).get("/api/stats/public");

      expect(res.statusCode).toBe(200);
      expect(res.body.activeLearners).toBe(0);
      expect(res.body.courses).toBe(0);
      expect(res.body.certificatesIssued).toBe(0);
      expect(res.body.instructors).toBe(0);
    });

    it("should handle large datasets efficiently", async () => {
      // Create a moderate number of records to test performance
      const studentPromises = [];
      for (let i = 0; i < 50; i++) {
        studentPromises.push(
          User.create({
            name: `Perf Student ${i}`,
            email: `perf-student${i}-${Date.now()}@example.com`,
            passwordHash: "hashedpassword",
            role: "student",
          })
        );
      }
      await Promise.all(studentPromises);

      const startTime = Date.now();
      const res = await request(app).get("/api/stats/public");
      const endTime = Date.now();

      expect(res.statusCode).toBe(200);
      expect(res.body.activeLearners).toBeGreaterThanOrEqual(50);
      // Should respond within reasonable time (< 2 seconds)
      expect(endTime - startTime).toBeLessThan(2000);
    });
  });
});
