const request = require("supertest");
const app = require("../../../app");
const Post = require("../post.model");
const { createTestUsers, createTestUser } = require("../../../tests/helpers/auth.helpers");
const { mockBlogPostData } = require("../../../tests/helpers/mock-data");
const { authPost, authPatch, authDelete } = require("../../../tests/helpers/test.helpers");

describe("Community API - Integration Tests", () => {
  describe("GET /api/community", () => {
    it("should return all published blog posts", async () => {
      const { instructor } = await createTestUsers();

      await Post.create(
        mockBlogPostData(instructor.userId, {
          title: "Blog Post 1",
          published: true,
        }),
      );
      await Post.create(
        mockBlogPostData(instructor.userId, {
          title: "Blog Post 2",
          published: true,
        }),
      );

      const res = await request(app).get("/api/community");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("POST /api/community", () => {
    it("should create a blog post as instructor", async () => {
      const { instructor } = await createTestUsers();

      const postData = {
        title: "New Blog Post",
        content: "This is a new blog post content",
        tags: ["tutorial", "javascript"],
        published: true,
      };

      const res = await authPost(app, "/api/community", instructor.token).send(
        postData,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(postData.title);
      expect(res.body.content).toBe(postData.content);
    });

    it("should create a blog post as admin", async () => {
      const { admin } = await createTestUsers();

      const postData = {
        title: "Admin Blog Post",
        content: "Admin content",
        published: true,
      };

      const res = await authPost(app, "/api/community", admin.token).send(
        postData,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(postData.title);
    });

    it("should reject blog post creation by student", async () => {
      const { student } = await createTestUsers();

      const postData = {
        title: "Student Blog Post",
        content: "Student content",
      };

      const res = await authPost(app, "/api/community", student.token).send(
        postData,
      );

      expect(res.statusCode).toBe(403);
    });
  });

  describe("GET /api/community/:id", () => {
    it("should return a single blog post by ID", async () => {
      const { instructor } = await createTestUsers();

      const post = await Post.create(mockBlogPostData(instructor.userId));

      const res = await request(app).get(`/api/community/${post._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(post._id.toString());
      expect(res.body.title).toBe(post.title);
    });
  });

  describe("PUT /api/community/:id", () => {
    it("should update blog post as author", async () => {
      const { instructor } = await createTestUsers();

      const post = await Post.create(mockBlogPostData(instructor.userId));

      const updates = {
        title: "Updated Title",
        content: "Updated content",
      };

      const res = await authPatch(
        app,
        `/api/community/${post._id}`,
        instructor.token,
      ).send(updates);

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(updates.title);
    });

    it("should reject update by non-author", async () => {
      const { instructor } = await createTestUsers();
      const { token: otherToken } = await createTestUser({ role: "instructor" });

      const post = await Post.create(mockBlogPostData(instructor.userId));

      const res = await authPatch(
        app,
        `/api/community/${post._id}`,
        otherToken,
      ).send({ title: "Hacked" });

      expect(res.statusCode).toBe(403);
    });
  });

  describe("DELETE /api/community/:id", () => {
    it("should delete blog post as author", async () => {
      const { instructor } = await createTestUsers();

      const post = await Post.create(mockBlogPostData(instructor.userId));

      const res = await authDelete(
        app,
        `/api/community/${post._id}`,
        instructor.token,
      );

      expect(res.statusCode).toBe(200);

      const deletedPost = await Post.findById(post._id);
      expect(deletedPost).toBeNull();
    });

    it("should delete blog post as admin", async () => {
      const { instructor, admin } = await createTestUsers();

      const post = await Post.create(mockBlogPostData(instructor.userId));

      const res = await authDelete(
        app,
        `/api/community/${post._id}`,
        admin.token,
      );

      expect(res.statusCode).toBe(200);
    });
  });

  describe("POST /api/community/:id/comments", () => {
    it("should add comment to blog post", async () => {
      const { instructor, student } = await createTestUsers();

      const post = await Post.create(mockBlogPostData(instructor.userId));

      const commentData = {
        content: "Great post!",
      };

      const res = await authPost(
        app,
        `/api/community/${post._id}/comments`,
        student.token,
      ).send(commentData);

      expect(res.statusCode).toBe(200);
      expect(res.body.content).toBe(commentData.content);
    });
  });

  describe("POST /api/community/:id/vote", () => {
    it("should vote on blog post", async () => {
      const { instructor, student } = await createTestUsers();

      const post = await Post.create(mockBlogPostData(instructor.userId));

      const res = await authPost(
        app,
        `/api/community/${post._id}/vote`,
        student.token,
      ).send({ vote: 1 });

      expect(res.statusCode).toBe(200);
    });
  });
});
