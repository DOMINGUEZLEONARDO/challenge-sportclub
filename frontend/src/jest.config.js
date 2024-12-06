module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest", // Esto es para transpilar TypeScript o JSX
    },
    extensionsToTreatAsEsm: [".ts", ".tsx", ".js", ".jsx"], // Agrega las extensiones que uses
    globals: {
      "ts-jest": {
        useESModules: true, // Permite que Jest use ESM
      },
    },
    moduleNameMapper: {
      "^axios$": require.resolve("axios"), // Asegúrate de que `axios` esté correctamente mapeado
    },
  };
  