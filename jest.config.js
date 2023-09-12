/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  testMatch: [
    "<rootDir>/tests/*.spec.js"
  ],
  bail: true,
  coverageProvider: "v8",
};

module.exports = config;