const request = require("supertest");
const app = require("../../../app");
const Post = require("../post.model"); // ForumPost model
const Comment = require("../comment.model");
const { createTestUsers } = require("../../../tests/helpers/auth.helpers");
const { mockForumPostData, mockCommentData } = require("../../../tests/helpers/mock-data");
const { authPost } = require("../../../tests/helpers/test.helpers");

describe("Forum API - Integration Tests", () => {
  describe("GET /api/forum/posts", () => {
    it("should return all forum posts", async () => {
      const { student } = await createTestUsers();

      await Post.create(mockForumPostData(student.userId, { title: "Post 1" }));
      await Post.create(mockForumPostData(student.userId, { title: "Post 2" }));

      const res = await request(app).get("/api/forum/posts");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    it("should populate author information", async () => {
      const { student } = await createTestUsers();

      await Post.create(mockForumPostData(student.userId));

      const res = await request(app).get("/api/forum/posts");

      expect(res.statusCode).toBe(200);
      expect(res.body[0].author).toBeDefined();
      expect(res.body[0].author.name).toBeDefined();
    });
  });

  describe("POST /api/forum/posts", () => {
    it("should create a forum post", async () => {
      const { student } = await createTestUsers();

      const postData = {
        title: "New Forum Post",
        content: "This is a new forum post",
        tags: ["question", "help"],
      };

      const res = await authPost(app, "/api/forum/posts", student.token).send(
        postData,
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(postData.title);
      expect(res.body.content).toBe(postData.content);
      expect(res.body.tags).toEqual(postData.tags);
    });

    it("should reject unauthenticated requests", async () => {
      const res = await request(app)
        .post("/api/forum/posts")
        .send({ title: "Test", content: "Test" });

      expect(res.statusCode).toBe(401);
    });
  });

  describe("GET /api/forum/posts/:id", () => {
    it("should return a single post by ID", async () => {
      const { student } = await createTestUsers();

      const post = await Post.create(mockForumPostData(student.userId));

      const res = await request(app).get(`/api/forum/posts/${post._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(post._id.toString());
      expect(res.body.title).toBe(post.title);
    });

    it("should return 404 for non-existent post", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/forum/posts/${fakeId}`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/forum/posts/:postId/comments", () => {
    it("should add a comment to a post", async () => {
      const { student } = await createTestUsers();

      const post = await Post.create(mockForumPostData(student.userId));

      const commentData = {
        content: "This is a comment",
      };

      const res = await authPost(
        app,
        `/api/forum/posts/${post._id}/comments`,
        student.token,
      ).send(commentData);

      expect(res.statusCode).toBe(200);
      expect(res.body.content).toBe(commentData.content);
    });

    it("should reject unauthenticated comment", async () => {
      const { student } = await createTestUsers();

      const post = await Post.create(mockForumPostData(student.userId));

      const res = await request(app)
        .post(`/api/forum/posts/${post._id}/comments`)
        .send({ content: "Test comment" });

      expect(res.statusCode).toBe(401);
    });
  });
});
