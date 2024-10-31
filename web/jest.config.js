module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
      "^.+\\.css$": "identity-obj-proxy"
    },
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",
       'axios': 'axios/dist/node/axios.cjs'
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)"
    ],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  };
  