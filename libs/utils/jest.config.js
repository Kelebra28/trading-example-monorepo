/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom", 
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
      "^@monorepo/(.*)$": "<rootDir>/../../$1/src"
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"]
  };
  