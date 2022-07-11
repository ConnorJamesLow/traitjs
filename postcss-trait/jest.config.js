/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "coverageThreshold": {
    "global": {
      "statements": 90
    }
  },
  rootDir: './src'
};