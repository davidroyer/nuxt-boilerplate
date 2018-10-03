module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    // https://github.com/prettier/eslint-config-prettier
    'prettier',
    'prettier/standard'
  ],
  rules: {
    // Only allow debugger in development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    // Only allow `console.log` in development
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
    // No `var`
    'no-var': 2,
    // No parens for arrow functions with one arg
    'arrow-parens': 0,
    // Allow exactly one attribute on each line
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ]
  }
}
