const pkg = require('./package')

module.exports = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  lang: 'en',
  url: 'http://localhost:3000',
  fontAwesomeIcons: {
    brands: ['faTwitter', 'faGithub', 'faLinkedinIn'],
    regular: ['faTimesCircle'],
    solid: ['faChevronRight, faAdjust', 'faSync', 'faUser', 'faStar', 'faTag']
  }  
}
