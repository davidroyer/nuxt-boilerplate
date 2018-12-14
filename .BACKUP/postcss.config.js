const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [
    require('tailwindcss')(tailwindJS),
    require('autoprefixer')
  ]
}

const path = require('path')
const modulesDir = path.join(__dirname, '..', '..', '..', 'node_modules')
const rootDir = __dirname

module.exports = {
  plugins: {
    'postcss-import': {
      root: rootDir,
      path: [rootDir, modulesDir]
    },
    'postcss-url': {},
    'postcss-preset-env': {}
  }
