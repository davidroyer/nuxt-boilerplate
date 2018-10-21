module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "/portfolio"
  analyticsID: '123',
  title: 'Nuxt Boilerplate - Starting Point For Websites', // Navigation and Site Title
  shortName: 'Nuxt Boilerplate', // Alternative Site title for SEO
  // url: 'https://www.davidroyer.me', // Domain of your site. No trailing slash!
  description: 'The site description will go here for SEO and Social Media Sharing',
  ogImage: 'share.png',
  lang: 'en',
  url: 'https://nuxt-boilerplate.netlify.com',
  fontAwesomeIcons: {
    brands: ['faTwitter', 'faGithub', 'faLinkedinIn'],
    regular: ['faTimesCircle'],
    solid: ['faChevronRight, faAdjust', 'faSync', 'faUser', 'faStar', 'faTag']
  }  
}
