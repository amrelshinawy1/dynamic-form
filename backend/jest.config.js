module.exports = {
  verbose: true,
  testEnvironment: 'node',
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  modulePaths: [
    '<rootDir>'
  ],
  testPathIgnorePatterns: ['src/migrations'],
  resetMocks: true,
  clearMocks: true,
  bail: 1,
  testTimeout: 15000,
  maxWorkers: 1,
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 25,
      statements: 45,
      functions: 25
    }
  }
};
