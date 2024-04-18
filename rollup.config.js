import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.cjs",
      format: "commonjs",
    },
    {
      file: "dist/index.mjs",
      format: "esm",
    },
  ],
  plugins: [json(), resolve(), commonjs()],
};
