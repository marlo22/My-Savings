// https://www.freecodecamp.org/news/setting-up-jest-enzyme-for-testing-react-native-40393ca04145/

module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ['<rootDir>setup-tests.js'],
  preset: 'react-native',
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
      enzymeAdapter: "react16"
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native|native-base-shoutem-theme|@shoutem/animation|@shoutem/ui|tcomb-form-native)"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!react-native|react-router-native)/"
  ]
};