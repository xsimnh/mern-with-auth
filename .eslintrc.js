module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "globals": {
    "module": "readonly",
    "require": "readonly",
    "process": "readonly",
    "__dirname": "readonly",
    // "jQuery": "readonly",
    // "$": "readonly"
  },
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "plugins": ["react", "react-hooks", "@typescript-eslint"],
  "rules": {
    // off some recommended rules
    // react
    "react/prop-types": "off",
    "react/jsx-no-undef": ["error", { "allowGlobals": true }],

    // hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // typescript
    "prefer-const": "warn",
    "@typescript-eslint/no-explicit-any": "off",

    // enhances error
    "semi": "error",
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "comma-dangle": ["error", "only-multiline"],
    "eol-last": "error",
    "radix": "error",
    "no-const-assign": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }],
    "no-self-compare": "error",
    "guard-for-in": "error",
    "default-param-last": "error",
    "array-callback-return": ["error", { "allowImplicit": false, "checkForEach": false }],
    "no-unused-expressions": [
      "error",
      { "allowShortCircuit": true, "allowTernary": true, "allowTaggedTemplates": true },
    ],
    "no-duplicate-imports": "error",

    // enhances warn
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "args": "none",
        "caughtErrors": "none",
        "ignoreRestSiblings": true,
        "vars": "all",
      },
    ],
    "@typescript-eslint/no-inferrable-types": "warn",
  },
};
