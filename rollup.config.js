import babel from "rollup-plugin-babel";

export default {
  input: "src/index.ts",
  output: {
    file: "cjs/index.js",
    format: "cjs"
  },
  plugins: [babel({ extensions: [".ts"] })],
  external: ["react"]
};
