const request = require("supertest");
const app = require("../../src/app");
const Course = require("../../src/modules/course/course.model");

// Helper to extract token from cookie
const extractToken = (res) => {
  const cookies = res.headers["set-cookie"];
  if (!cookies) return null;
  const tokenCookie = cookies.find((c) => c.startsWith("token="));
  if (!tokenCookie) return null;
  return tokenCookie.split(";")[0].split("=")[1];
};

describe("E2E: Instructor Course Creation Flow", () => {
  it("should complete full instructor journey: register → create course → add modules → add lessons → publish", async () => {
    // Step 1: Register as instructor
    const instructorData = {
      name: "Jane Instructor",
      email: `instructor${Date.now()}@example.com`,
      password: "password123",
      role: "instructor",
    };

    const registerRes = await request(app)
      .post("/api/auth/register")
      .send(instructorData);

    expect(registerRes.statusCode).toBe(200);
    const instructorId = registerRes.body.user.id;

    // Step 2: Login
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: instructorData.email, password: instructorData.password });

    expect(loginRes.statusCode).toBe(200);
    const token = extractToken(loginRes);

    // Step 3: Create a course
    const courseData = {
      title: "Instructor's New Course",
      slug: `instructor-course-${Date.now()}`,
      description: "A comprehensive course",
      category: "Programming",
      level: "Intermediate",
      duration: 20,
      price: 49.99,
      published: false,
    };

    const courseRes = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${token}`)
      .send(courseData);

    expect(courseRes.statusCode).toBe(201);
    const courseId = courseRes.body._id;

    // Step 4: Add a module
    const moduleData = {
      title: "Introduction Module",
      description: "Getting started with the course",
      order: 1,
    };

    const moduleRes = await request(app)
      .post(`/api/courses/${courseId}/modules`)
      .set("Authorization", `Bearer ${token}`)
      .send(moduleData);

    expect(moduleRes.statusCode).toBe(201);
    const moduleId = moduleRes.body._id;

    // Step 5: Add lessons to module
    const lesson1Data = {
      title: "Introduction Video",
      type: "video",
      content: "https://example.com/intro.mp4",
      duration: 15,
      order: 1,
    };

    const lesson1Res = await request(app)
      .post(`/api/courses/${courseId}/modules/${moduleId}/lessons`)
      .set("Authorization", `Bearer ${token}`)
      .send(lesson1Data);

    expect(lesson1Res.statusCode).toBe(201);

    const lesson2Data = {
      title: "Reading Material",
      type: "text",
      content: "Course introduction text content",
      duration: 5,
      order: 2,
    };

    const lesson2Res = await request(app)
      .post(`/api/courses/${courseId}/modules/${moduleId}/lessons`)
      .set("Authorization", `Bearer ${token}`)
      .send(lesson2Data);

    expect(lesson2Res.statusCode).toBe(201);

    // Step 6: Publish the course
    const publishRes = await request(app)
      .put(`/api/courses/${courseId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ published: true });

    expect(publishRes.statusCode).toBe(200);
    expect(publishRes.body.published).toBe(true);

    // Step 7: Verify course is visible in public listing
    const publicCoursesRes = await request(app).get("/api/courses");

    expect(publicCoursesRes.statusCode).toBe(200);
    const createdCourse = publicCoursesRes.body.find(
      (c) => c._id === courseId,
    );
    expect(createdCourse).toBeDefined();
    expect(createdCourse.published).toBe(true);

    // Step 8: Check instructor stats
    const statsRes = await request(app)
      .get("/api/courses/instructor/stats")
      .set("Authorization", `Bearer ${token}`);

    expect(statsRes.statusCode).toBe(200);
    expect(statsRes.body.totalCourses).toBeGreaterThan(0);
  });
});
