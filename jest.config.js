module.exports = {
    roots: [ './lib', './test' ],
  verbose: true,
  "transform": {
  "^.+\\.(ts|tsx)$": "ts-jest",
    ".js$": "babel-jest"
  },
"reporters": [
    "default"
  ],
 "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};
