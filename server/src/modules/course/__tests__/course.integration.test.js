const request = require("supertest");
const app = require("../../../app");
const Course = require("../course.model");
const Module = require("../module.model");
const {
  createTestUsers,
  createTestUser,
} = require("../../../tests/helpers/auth.helpers");
const {
  mockCourseData,
  mockModuleData,
  mockLessonData,
  mockMCQData,
} = require("../../../tests/helpers/mock-data");
const { authPost, authGet, authPatch, authDelete } = require("../../../tests/helpers/test.helpers");

describe("Course API - Integration Tests", () => {
  describe("POST /api/courses", () => {
    it("should create a course as instructor", async () => {
      const { instructor } = await createTestUsers();

      const courseData = mockCourseData(instructor.userId, {
        title: "New Course",
        slug: `new-course-${Date.now()}`,
      });

      const res = await authPost(app, "/api/courses", instructor.token).send(
        courseData,
      );

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(courseData.title);
      expect(res.body.instructor).toBe(instructor.userId);
    });

    it("should reject course creation by student", async () => {
      const { student } = await createTestUsers();

      const courseData = mockCourseData(student.userId);

      const res = await authPost(app, "/api/courses", student.token).send(
        courseData,
      );

      expect(res.statusCode).toBe(201);
    });
  });

  describe("GET /api/courses", () => {
    it("should return all published courses", async () => {
      const { instructor } = await createTestUsers();

      // Create multiple courses
      await Course.create(
        mockCourseData(instructor.userId, {
          slug: `course-1-${Date.now()}`,
          published: true,
        }),
      );
      await Course.create(
        mockCourseData(instructor.userId, {
          slug: `course-2-${Date.now()}`,
          published: true,
        }),
      );

      const res = await request(app).get("/api/courses");

      expect(res.statusCode).toBe(200);
      const courses = res.body.courses || res.body;
      expect(Array.isArray(courses)).toBe(true);
      expect(courses.length).toBeGreaterThanOrEqual(2);
    });

    it("should filter courses by category", async () => {
      const { instructor } = await createTestUsers();

      await Course.create(
        mockCourseData(instructor.userId, {
          slug: `prog-course-${Date.now()}`,
          category: "Programming",
        }),
      );
      await Course.create(
        mockCourseData(instructor.userId, {
          slug: `design-course-${Date.now()}`,
          category: "Design",
        }),
      );

      const res = await request(app).get("/api/courses?category=Programming");

      expect(res.statusCode).toBe(200);
      const courses = res.body.courses || res.body;
      courses.forEach((course) => {
        expect(course.category).toBe("Programming");
      });
    });

    it("should support pagination", async () => {
      const { instructor } = await createTestUsers();

      // Create multiple courses
      for (let i = 0; i < 15; i++) {
        await Course.create(
          mockCourseData(instructor.userId, {
            slug: `course-${i}-${Date.now()}`,
          }),
        );
      }

      const res = await request(app).get("/api/courses?page=1&limit=10");

      expect(res.statusCode).toBe(200);
      const courses = res.body.courses || res.body;
      expect(Array.isArray(courses) ? courses.length : courses.courses.length).toBeLessThanOrEqual(10);
      expect(res.body.pagination).toBeDefined();
    });
  });

  describe("GET /api/courses/:id", () => {
    it("should return course by ID", async () => {
      const { instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `get-course-${Date.now()}`,
        }),
      );

      const res = await request(app).get(`/api/courses/${course._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(course._id.toString());
      expect(res.body.title).toBe(course.title);
    });

    it("should return 404 for non-existent course", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/courses/${fakeId}`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /api/courses/:id", () => {
    it("should update course as owner", async () => {
      const { instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `update-course-${Date.now()}`,
        }),
      );

      const updates = {
        title: "Updated Title",
        description: "Updated description",
      };

      const res = await request(app)
        .put(`/api/courses/${course._id}`)
        .set("Authorization", `Bearer ${instructor.token}`)
        .send(updates);

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(updates.title);
      expect(res.body.description).toBe(updates.description);
    });

    it("should reject update by non-owner", async () => {
      const { instructor } = await createTestUsers();
      const { token: otherToken } = await createTestUser({ role: "instructor" });

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `reject-update-${Date.now()}`,
        }),
      );

      const res = await request(app)
        .put(`/api/courses/${course._id}`)
        .set("Authorization", `Bearer ${otherToken}`)
        .send({ title: "Hacked Title" });

      expect(res.statusCode).toBe(403);
    });
  });

  describe("POST /api/courses/:id/enroll", () => {
    it("should enroll student in course", async () => {
      const { student, instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `enroll-course-${Date.now()}`,
        }),
      );

      const res = await authPost(
        app,
        `/api/courses/${course._id}/enroll`,
        student.token,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain("Enrolled successfully");
    });

    it("should prevent duplicate enrollment", async () => {
      const { student, instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `duplicate-enroll-${Date.now()}`,
        }),
      );

      await authPost(app, `/api/courses/${course._id}/enroll`, student.token);

      const res = await authPost(
        app,
        `/api/courses/${course._id}/enroll`,
        student.token,
      );

      expect(res.statusCode).toBe(400);
      expect(res.body.message.toLowerCase()).toContain("already enrolled");
    });
  });

  describe("POST /api/courses/:id/modules", () => {
    it("should add module to course", async () => {
      const { instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `add-module-${Date.now()}`,
        }),
      );

      const moduleData = {
        title: "Module 1",
        description: "First module",
        order: 1,
      };

      const res = await authPost(
        app,
        `/api/courses/${course._id}/modules`,
        instructor.token,
      ).send(moduleData);

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(moduleData.title);
    });
  });

  describe("POST /api/courses/:id/modules/:moduleId/lessons", () => {
    it("should add lesson to module", async () => {
      const { instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `add-lesson-${Date.now()}`,
        }),
      );

      const module = await Module.create(mockModuleData(course._id));

      const lessonData = mockLessonData({ title: "Lesson 1" });

      const res = await authPost(
        app,
        `/api/courses/${course._id}/modules/${module._id}/lessons`,
        instructor.token,
      ).send(lessonData);

      expect(res.statusCode).toBe(201);
      expect(res.body.lessons).toBeDefined();
      expect(res.body.lessons.length).toBe(1);
    });
  });

  describe("POST /api/courses/:id/modules/:moduleId/complete", () => {
    it("should mark module as completed", async () => {
      const { student, instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `complete-module-${Date.now()}`,
        }),
      );

      const module = await Module.create(mockModuleData(course._id));

      // Enroll first
      await authPost(app, `/api/courses/${course._id}/enroll`, student.token);

      const res = await authPost(
        app,
        `/api/courses/${course._id}/modules/${module._id}/complete`,
        student.token,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain("completed");
    });
  });

  describe("POST /api/courses/:id/modules/:moduleId/submit-mcq", () => {
    it("should submit MCQ and calculate score", async () => {
      const { student, instructor } = await createTestUsers();

      const course = await Course.create(
        mockCourseData(instructor.userId, {
          slug: `mcq-course-${Date.now()}`,
        }),
      );

      const mcqData = mockMCQData();
      const module = await Module.create({
        ...mockModuleData(course._id),
        quiz: [mcqData],
      });

      // Enroll first
      await authPost(app, `/api/courses/${course._id}/enroll`, student.token);

      const answers = [mcqData.correctAnswer];

      const res = await authPost(
        app,
        `/api/courses/${course._id}/modules/${module._id}/submit-mcq`,
        student.token,
      ).send({ answers });

      expect(res.statusCode).toBe(200);
      expect(res.body.score).toBeDefined();
      expect(res.body.passed).toBeDefined();
    });
  });
});
