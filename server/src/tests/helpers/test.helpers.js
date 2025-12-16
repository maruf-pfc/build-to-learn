const request = require("supertest");

/**
 * Make an authenticated request
 */
const authenticatedRequest = (app, method, url, token) => {
  const req = request(app)[method](url);
  if (token) {
    req.set("Authorization", `Bearer ${token}`);
  }
  return req;
};

/**
 * Make an authenticated GET request
 */
const authGet = (app, url, token) => authenticatedRequest(app, "get", url, token);

/**
 * Make an authenticated POST request
 */
const authPost = (app, url, token) =>
  authenticatedRequest(app, "post", url, token);

/**
 * Make an authenticated PATCH request
 */
const authPatch = (app, url, token) =>
  authenticatedRequest(app, "patch", url, token);

/**
 * Make an authenticated DELETE request
 */
const authDelete = (app, url, token) =>
  authenticatedRequest(app, "delete", url, token);

/**
 * Extract cookie from response
 */
const extractCookie = (res, cookieName = "token") => {
  const cookies = res.headers["set-cookie"];
  if (!cookies) return null;

  const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
  if (!cookie) return null;

  return cookie.split(";")[0].split("=")[1];
};

/**
 * Expect error response with specific message
 */
const expectError = (res, statusCode, message) => {
  expect(res.statusCode).toBe(statusCode);
  if (message) {
    expect(res.body.message).toBeDefined();
    if (typeof message === "string") {
      expect(res.body.message).toContain(message);
    }
  }
};

/**
 * Expect success response
 */
const expectSuccess = (res, statusCode = 200) => {
  expect(res.statusCode).toBe(statusCode);
};

module.exports = {
  authenticatedRequest,
  authGet,
  authPost,
  authPatch,
  authDelete,
  extractCookie,
  expectError,
  expectSuccess,
};
