import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "cjs/index.js",
      format: "cjs"
    },
    plugins: [babel({ extensions: [".ts"] })],
    external: ["react"]
  },
  {
    input: "src/index.ts",
    output: {
      file: "esm/index.js",
      format: "esm"
    },
    plugins: [babel({ extensions: [".ts"] })],
    external: ["react"]
  }
];
