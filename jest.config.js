// https://www.freecodecamp.org/news/setting-up-jest-enzyme-for-testing-react-native-40393ca04145/

module.exports = {
  setupFilesAfterEnv: ['<rootDir>setup-tests.js'],
  preset: 'react-native',
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
      enzymeAdapter: "react16"
  }  
};