const mongoose = require("mongoose");

/**
 * Generate mock course data
 */
const mockCourseData = (instructorId, overrides = {}) => ({
  title: "Test Course",
  slug: `test-course-${Date.now()}`,
  description: "A test course description",
  instructor: instructorId,
  thumbnail: "https://example.com/thumbnail.jpg",
  category: "Programming",
  level: "Beginner",
  duration: 10,
  price: 0,
  published: true,
  ...overrides,
});

/**
 * Generate mock module data
 */
const mockModuleData = (courseId, overrides = {}) => ({
  course: courseId,
  title: "Test Module",
  description: "A test module description",
  order: 1,
  lessons: [],
  ...overrides,
});

/**
 * Generate mock lesson data
 */
const mockLessonData = (overrides = {}) => ({
  title: "Test Lesson",
  type: "video",
  content: "https://example.com/video.mp4",
  duration: 10,
  order: 1,
  ...overrides,
});

/**
 * Generate mock MCQ data
 */
const mockMCQData = (overrides = {}) => ({
  question: "What is 2 + 2?",
  options: ["3", "4", "5", "6"],
  correctAnswer: 1,
  points: 10,
  ...overrides,
});

/**
 * Generate mock forum post data
 */
const mockForumPostData = (authorId, overrides = {}) => ({
  title: "Test Forum Post",
  content: "This is a test forum post content",
  author: authorId,
  tags: ["test", "question"],
  ...overrides,
});

/**
 * Generate mock blog post data
 */
const mockBlogPostData = (authorId, overrides = {}) => ({
  title: "Test Blog Post",
  content: "This is a test blog post content",
  author: authorId,
  tags: ["test", "tutorial"],
  published: true,
  type: "blog", // Required field
  ...overrides,
});

/**
 * Generate mock comment data
 */
const mockCommentData = (authorId, overrides = {}) => ({
  content: "This is a test comment",
  author: authorId,
  ...overrides,
});

/**
 * Generate mock user profile data
 */
const mockUserProfileData = (overrides = {}) => ({
  bio: "Test bio",
  headline: "Test headline",
  skills: ["JavaScript", "Node.js"],
  socialLinks: {
    website: "https://example.com",
    github: "https://github.com/testuser",
  },
  ...overrides,
});

/**
 * Create a valid MongoDB ObjectId
 */
const createObjectId = () => new mongoose.Types.ObjectId();

/**
 * Wait for a specified time (useful for async operations)
 */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  mockCourseData,
  mockModuleData,
  mockLessonData,
  mockMCQData,
  mockForumPostData,
  mockBlogPostData,
  mockCommentData,
  mockUserProfileData,
  createObjectId,
  wait,
};
