module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "prettier", 'plugin:prettier/recommended'],
  plugins: ["prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // production에서 console.log 가 발견되면 error 발생. production이 아니면 off
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": ['error', {
      singleQuote: true,
      semi: true,
      printWidth: 80,
      bracketSpacing: true,
      arrowParens: 'avoid'
    }]
  },
  overrides: [ 
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
