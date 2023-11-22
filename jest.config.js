/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 25000,
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  // testSequencer: './src/test/testSequencer.ts',
};
