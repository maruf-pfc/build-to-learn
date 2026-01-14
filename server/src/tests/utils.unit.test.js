const mongoose = require("mongoose");

describe("Database Utilities - Unit Tests", () => {
  describe("MongoDB ObjectId", () => {
    it("should create valid ObjectId", () => {
      const id = new mongoose.Types.ObjectId();
      expect(id).toBeDefined();
      expect(mongoose.Types.ObjectId.isValid(id)).toBe(true);
    });

    it("should validate valid ObjectId string", () => {
      const validId = "507f1f77bcf86cd799439011";
      expect(mongoose.Types.ObjectId.isValid(validId)).toBe(true);
    });

    it("should reject invalid ObjectId string", () => {
      const invalidId = "invalid-id";
      expect(mongoose.Types.ObjectId.isValid(invalidId)).toBe(false);
    });

    it("should convert string to ObjectId", () => {
      const idString = "507f1f77bcf86cd799439011";
      const objectId = new mongoose.Types.ObjectId(idString);
      expect(objectId.toString()).toBe(idString);
    });

    it("should compare ObjectIds correctly", () => {
      const id1 = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011");
      const id2 = new mongoose.Types.ObjectId("507f1f77bcf86cd799439011");
      expect(id1.equals(id2)).toBe(true);
    });

    it("should detect different ObjectIds", () => {
      const id1 = new mongoose.Types.ObjectId();
      const id2 = new mongoose.Types.ObjectId();
      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe("Data Validation", () => {
    it("should validate email format", () => {
      const validEmail = "test@example.com";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(validEmail)).toBe(true);
    });

    it("should validate URL format", () => {
      const validUrl = "https://example.com";
      const urlRegex = /^https?:\/\/.+/;
      expect(urlRegex.test(validUrl)).toBe(true);
    });

    it("should validate slug format", () => {
      const validSlug = "my-course-slug-123";
      const slugRegex = /^[a-z0-9-]+$/;
      expect(slugRegex.test(validSlug)).toBe(true);
    });

    it("should reject invalid slug", () => {
      const invalidSlug = "My Course Slug!";
      const slugRegex = /^[a-z0-9-]+$/;
      expect(slugRegex.test(invalidSlug)).toBe(false);
    });
  });

  describe("String Utilities", () => {
    it("should trim whitespace", () => {
      const text = "  hello world  ";
      expect(text.trim()).toBe("hello world");
    });

    it("should convert to lowercase", () => {
      const text = "HELLO WORLD";
      expect(text.toLowerCase()).toBe("hello world");
    });

    it("should convert to uppercase", () => {
      const text = "hello world";
      expect(text.toUpperCase()).toBe("HELLO WORLD");
    });

    it("should replace spaces with hyphens", () => {
      const text = "hello world test";
      expect(text.replace(/\s+/g, "-")).toBe("hello-world-test");
    });

    it("should truncate long strings", () => {
      const longText = "This is a very long text that needs to be truncated";
      const maxLength = 20;
      const truncated = longText.substring(0, maxLength);
      expect(truncated.length).toBe(maxLength);
    });
  });

  describe("Array Utilities", () => {
    it("should check if array is empty", () => {
      const emptyArray = [];
      expect(emptyArray.length).toBe(0);
      expect(Array.isArray(emptyArray)).toBe(true);
    });

    it("should check if array has elements", () => {
      const array = [1, 2, 3];
      expect(array.length).toBeGreaterThan(0);
    });

    it("should filter array elements", () => {
      const numbers = [1, 2, 3, 4, 5];
      const evens = numbers.filter((n) => n % 2 === 0);
      expect(evens).toEqual([2, 4]);
    });

    it("should map array elements", () => {
      const numbers = [1, 2, 3];
      const doubled = numbers.map((n) => n * 2);
      expect(doubled).toEqual([2, 4, 6]);
    });

    it("should find element in array", () => {
      const fruits = ["apple", "banana", "orange"];
      expect(fruits.includes("banana")).toBe(true);
      expect(fruits.includes("grape")).toBe(false);
    });

    it("should remove duplicates from array", () => {
      const numbers = [1, 2, 2, 3, 3, 3, 4];
      const unique = [...new Set(numbers)];
      expect(unique).toEqual([1, 2, 3, 4]);
    });
  });

  describe("Number Utilities", () => {
    it("should validate number is positive", () => {
      const num = 42;
      expect(num).toBeGreaterThan(0);
    });

    it("should validate number is negative", () => {
      const num = -42;
      expect(num).toBeLessThan(0);
    });

    it("should round number to decimal places", () => {
      const num = 3.14159;
      const rounded = Math.round(num * 100) / 100;
      expect(rounded).toBe(3.14);
    });

    it("should calculate percentage", () => {
      const part = 25;
      const total = 100;
      const percentage = (part / total) * 100;
      expect(percentage).toBe(25);
    });

    it("should clamp number between min and max", () => {
      const num = 150;
      const min = 0;
      const max = 100;
      const clamped = Math.min(Math.max(num, min), max);
      expect(clamped).toBe(100);
    });
  });

  describe("Date Utilities", () => {
    it("should create current date", () => {
      const now = new Date();
      expect(now).toBeInstanceOf(Date);
    });

    it("should format date to ISO string", () => {
      const date = new Date("2024-01-01");
      const iso = date.toISOString();
      expect(iso).toContain("2024-01-01");
    });

    it("should calculate days difference", () => {
      const date1 = new Date("2024-01-01");
      const date2 = new Date("2024-01-08");
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      expect(diffDays).toBe(7);
    });

    it("should check if date is in past", () => {
      const pastDate = new Date("2020-01-01");
      const now = new Date();
      expect(pastDate.getTime()).toBeLessThan(now.getTime());
    });

    it("should add days to date", () => {
      const date = new Date("2024-01-01");
      date.setDate(date.getDate() + 7);
      expect(date.getDate()).toBe(8);
    });
  });
});
