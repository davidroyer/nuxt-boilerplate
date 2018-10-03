/**
 * Get absolute path of a file
 * @param {string} path Relative file path
 * @return {string} Absolute file path
 */
function resolve(path) {
  return require('path').join(__dirname, path)
}

module.exports = {
  '@src': resolve('./src'),
  '@components': resolve('./src/components'),
  '@layouts': resolve('./src/layouts'),
  '@middleware': resolve('./src/middleware'),
  '@pages': resolve('./src/pages'),
  '@plugins': resolve('./src/plugins'),
  '@store': resolve('./src/store'),
  '@styles': resolve('./src/assets/styles'),
  '@images': resolve('./src/assets/images')
}
