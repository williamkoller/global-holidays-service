module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/entities/**.entity.ts',
    '!<rootDir>/src/migration/**.ts',
    '!<rootDir>/src/scripts/**.ts',
    '!<rootDir>/src/config/**.ts',
    '!<rootDir>/src/shared/**/**.ts',
    '!<rootDir>/src/auth/**/**.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/app.module.ts',
    '!<rootDir>/src/**/dtos/**.ts',
    '!<rootDir>/src/**/**/**.module.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
};
