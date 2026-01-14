const request = require("supertest");
const app = require("../../src/app");
const Course = require("../../src/modules/course/course.model");
const Module = require("../../src/modules/course/module.model");
const User = require("../../src/modules/users/user.model");

// Helper to extract token from cookie
const extractToken = (res) => {
  const cookies = res.headers["set-cookie"];
  if (!cookies) return null;
  const tokenCookie = cookies.find((c) => c.startsWith("token="));
  if (!tokenCookie) return null;
  return tokenCookie.split(";")[0].split("=")[1];
};

describe("E2E: Student Enrollment Flow", () => {
  it("should complete full student journey: register → login → enroll → complete course → get certificate", async () => {
    // Step 1: Register as student
    const studentData = {
      name: "John Student",
      email: `student${Date.now()}@example.com`,
      password: "password123",
      role: "student",
    };

    const registerRes = await request(app)
      .post("/api/auth/register")
      .send(studentData);

    expect(registerRes.statusCode).toBe(200);
    const studentId = registerRes.body.user.id;
    const studentToken = extractToken(registerRes);

    // Step 2: Login
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: studentData.email, password: studentData.password });

    expect(loginRes.statusCode).toBe(200);
    const token = extractToken(loginRes);

    // Create instructor and course for enrollment
    const instructorData = {
      name: "Jane Instructor",
      email: `instructor${Date.now()}@example.com`,
      password: "password123",
      role: "instructor",
    };

    const instructorRes = await request(app)
      .post("/api/auth/register")
      .send(instructorData);

    const instructorId = instructorRes.body.user.id;

    // Create a course
    const course = await Course.create({
      title: "E2E Test Course",
      slug: `e2e-course-${Date.now()}`,
      description: "Test course for E2E",
      instructor: instructorId,
      category: "Programming",
      level: "Beginner",
      duration: 10,
      price: 0,
      published: true,
    });

    // Create a module
    const module = await Module.create({
      course: course._id,
      title: "Module 1",
      description: "First module",
      order: 1,
      lessons: [
        {
          title: "Lesson 1",
          type: "video",
          content: "https://example.com/video.mp4",
          duration: 10,
          order: 1,
        },
      ],
    });

    // Step 3: Browse courses
    const coursesRes = await request(app).get("/api/courses");
    expect(coursesRes.statusCode).toBe(200);
    const courses = coursesRes.body.courses || coursesRes.body;
    expect(Array.isArray(courses) ? courses.length : courses.courses.length).toBeGreaterThan(0);

    // Step 4: Enroll in course
    const enrollRes = await request(app)
      .post(`/api/courses/${course._id}/enroll`)
      .set("Authorization", `Bearer ${token}`);

    expect(enrollRes.statusCode).toBe(200);

    // Step 5: Complete module
    const completeRes = await request(app)
      .post(`/api/courses/${course._id}/modules/${module._id}/complete`)
      .set("Authorization", `Bearer ${token}`);

    expect(completeRes.statusCode).toBe(200);

    // Step 6: Mark course as completed and generate certificate
    await User.findByIdAndUpdate(studentId, {
      $set: {
        "enrolledCourses.$[elem].completedAt": new Date(),
        "enrolledCourses.$[elem].progress": 100,
      },
    }, {
      arrayFilters: [{ "elem.course": course._id }],
    });

    const certRes = await request(app)
      .post("/api/certificates/generate")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: course._id });

    expect(certRes.statusCode).toBe(201);
    expect(certRes.body.course).toBe(course._id.toString());

    // Step 7: Verify certificate
    const myCertsRes = await request(app)
      .get("/api/certificates/my")
      .set("Authorization", `Bearer ${token}`);

    expect(myCertsRes.statusCode).toBe(200);
    expect(myCertsRes.body.length).toBeGreaterThan(0);
  });
});
