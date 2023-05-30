const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const svgr = require("@svgr/rollup");
const { terser } = require("rollup-plugin-terser");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const glob = require("glob");
const postcss = require("rollup-plugin-postcss");
const alias = require("@rollup/plugin-alias");

/**
 * @type {Record<string, (warning: object) => boolean}
 */
const IGNORED_WARNING = {
  CIRCULAR_DEPENDENCY: ({ importer }) =>
    importer && importer.includes("node_modules"),
  EMPTY_BUNDLE: () => true
};

/**
 * @type {import("rollup").RollupOptions}
 */
module.exports = {
  onwarn: (warning, defaultOnWarn) => {
    const { code } = warning;

    const shouldIgnoreWarning = IGNORED_WARNING[code];

    if (shouldIgnoreWarning?.(warning)) {
      return;
    }

    defaultOnWarn(warning);
  },
  input: [
    ...glob.sync("./src/**/!(*.test).{ts,tsx}"),
    ...glob.sync("./src/**/*.svg")
  ],
  output: {
    dir: "./lib",
    format: "cjs",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: "inline",
    exports: "auto"
  },
  plugins: [
    peerDepsExternal({
      includeDependencies: true
    }),
    postcss({}),
    resolve({
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./lib"
    }),
    terser(),
    svgr({
      removeViewBox: false,
      prefixIds: false,
      svgo: false
    }),
    alias({
      entries: [{ find: "~setup/*", replacement: "./src/setup/*" }]
    })
  ],
  external: ["react", "react-dom", "prop-types", "react/jsx-runtime"]
};
