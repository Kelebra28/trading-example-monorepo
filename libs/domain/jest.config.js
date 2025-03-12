/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    "**/src/test/**/*.test.ts"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ]
};