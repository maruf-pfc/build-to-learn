module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],
  testMatch: [
    "<rootDir>/src/tests/**/*.test.js",
    "<rootDir>/src/modules/**/__tests__/**/*.test.js",
    "<rootDir>/e2e/**/*.test.js",
  ],
  clearMocks: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/tests/**",
    "!src/**/__tests__/**",
    "!src/server.js",
  ],
  testTimeout: 60000,
};
