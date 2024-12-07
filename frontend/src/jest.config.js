module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest",
    },
    extensionsToTreatAsEsm: [".ts", ".tsx", ".js", ".jsx"],
    globals: {
      "ts-jest": {
        useESModules: true,
      },
    },
    moduleNameMapper: {
      "^axios$": require.resolve("axios"),
      },
  };
  