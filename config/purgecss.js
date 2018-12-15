const path = require('path')

module.exports = {
  mode: 'postcss',
  paths: [
    path.join(__dirname, './src/pages/**/*.vue'),
    path.join(__dirname, './src/layouts/**/*.vue'),
    path.join(__dirname, './src/components/**/*.vue'),
    path.join(__dirname, './src/plugins/**/*.js')
  ],
  whitelistPatterns: [
    /^__/,
    /^fa-/,
    /^svg-/,
    /^v-/,
    /^page-/,
    /^nuxt/,
    /^scale/,
    /^slide/,
    /^enter/,
    /^leave/
  ]
}
