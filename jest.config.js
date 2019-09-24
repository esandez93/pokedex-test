module.exports = {
  roots: [ '<rootDir>/src' ],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest'
  },
  testMatch: [ '<rootDir>/src/**/*.test.{js, jsx}' ], // finds test
  moduleFileExtensions: [ 'js', 'jsx', 'json', 'node' ],
  testPathIgnorePatterns: [ '/node_modules/', '/public/' ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    components: '<rootDir>/src/components/',
    api: '<rootDir>/src/api/',
    src: '<rootDir>/src/',
    pages: '<rootDir>/src/pages/',
    assets: '<rootDir>/src/assets/'
  },
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js'
  ] // setupFiles before the tests are ran
};
