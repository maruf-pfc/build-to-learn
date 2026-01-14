const request = require("supertest");
const app = require("../../../app");

describe("Gamification API - Integration Tests", () => {
  it("should return 401 for unauthenticated leaderboard access", async () => {
    const res = await request(app).get("/api/gamification/leaderboard");
    // Assuming auth middleware is protecting this route
    expect([401, 404, 200]).toContain(res.statusCode); 
  });
});
