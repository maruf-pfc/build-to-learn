const request = require("supertest");
const app = require("../../../app");
const Certificate = require("../certificate.model");
const Course = require("../../course/course.model");
const User = require("../../users/user.model");
const { createTestUsers } = require("../../../tests/helpers/auth.helpers");
const { mockCourseData } = require("../../../tests/helpers/mock-data");
const { authPost, authGet } = require("../../../tests/helpers/test.helpers");

describe("Certificate API - Integration Tests", () => {
  describe("POST /api/certificates/generate", () => {
    it("should generate certificate for completed course", async () => {
      const { student, instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `cert-course-${Date.now()}`,
        }),
      );

      // Mark course as completed
      await User.findByIdAndUpdate(student.userId, {
        $push: {
          enrolledCourses: {
            course: course._id,
            completedAt: new Date(),
            progress: 100,
          },
        },
      });

      const res = await authPost(
        app,
        "/api/certificates/generate",
        student.token,
      ).send({ courseId: course._id });

      expect(res.statusCode).toBe(200);
      expect(res.body.course).toBe(course._id.toString());
      expect(res.body.student).toBe(student.userId);
    });

    it("should prevent duplicate certificate generation", async () => {
      const { student, instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `dup-cert-${Date.now()}`,
        }),
      );

      await User.findByIdAndUpdate(student.userId, {
        $push: {
          enrolledCourses: {
            course: course._id,
            completedAt: new Date(),
            progress: 100,
          },
        },
      });

      await authPost(app, "/api/certificates/generate", student.token).send({
        courseId: course._id,
      });

      const res = await authPost(
        app,
        "/api/certificates/generate",
        student.token,
      ).send({ courseId: course._id });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /api/certificates/my", () => {
    it("should return user certificates", async () => {
      const { student, instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `my-cert-${Date.now()}`,
        }),
      );

      await Certificate.create({
        student: student.userId,
        course: course._id,
        issuedAt: new Date(),
      });

      const res = await authGet(app, "/api/certificates/my", student.token);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("GET /api/certificates/:id", () => {
    it("should verify certificate by ID", async () => {
      const { student, instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `verify-cert-${Date.now()}`,
        }),
      );

      const certificate = await Certificate.create({
        student: student.userId,
        course: course._id,
        issuedAt: new Date(),
      });

      const res = await request(app).get(
        `/api/certificates/${certificate._id}`,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(certificate._id.toString());
    });

    it("should return 404 for non-existent certificate", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/certificates/${fakeId}`);

      expect(res.statusCode).toBe(404);
    });
  });
});
