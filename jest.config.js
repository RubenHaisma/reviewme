module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/lib/(.*)$': '<rootDir>/lib/$1', // Adjust based on your project structure
    },
  };