module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  //   BUG: cannot filter polyfill well with targets option, see detail https://github.com/babel/babel/issues/13226
  //   "plugins": [["@babel/plugin-transform-runtime", { "corejs": 3 }]],
};
