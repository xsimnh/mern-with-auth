module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  "comments": true,
  "plugins": [
    // BUG: cannot filter polyfill well with targets option, see detail https://github.com/babel/babel/issues/13226
    // ["@babel/plugin-transform-runtime", { "corejs": 3 }],
    process.env.NODE_ENV === "development" && "react-refresh/babel",
  ].filter(Boolean),
};
