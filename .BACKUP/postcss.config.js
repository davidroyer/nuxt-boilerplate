const join = require('path').join
const typographyConfig = require('./config/typography')
const tailwindConfig = require('./config/tailwind')

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-responsive-type': {},
    'postcss-typography': typographyConfig,
    'postcss-easing-gradients': {},
    'postcss-animation': {},
    'postcss-nested': {},
    'postcss-preset-env': {},
    'css-mqpacker': {
      sort: true
    },
    autoprefixer: {},
    tailwindcss: tailwindConfig
  }
}
