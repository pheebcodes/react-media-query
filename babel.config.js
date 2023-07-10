const testConfig = {
  presets: [
    "@babel/react",
    ["@babel/env", { targets: { node: true } }],
    "@babel/typescript"
  ]
};

const config = {
  presets: ["@babel/typescript"]
};

module.exports = api => {
  if (api.env("test")) {
    return testConfig;
  }
  return config;
};
