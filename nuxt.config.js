import path from 'path'
import glob from 'glob-all'
import config from './app.config'
import aliases from './aliases.config'
import { colors } from './tailwind.config'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import StylelintPlugin from 'stylelint-webpack-plugin'
const purgecssWhitelistPatterns = [
  /^__/,
  /^fa/,
  /^v-/,
  /^page-/,
  /^nuxt/,
  /^scale/,
  /^slide/,
  /^enter/,
  /^leave/
]

export default {
  /**
   * Application type
   * @see https://nuxtjs.org/api/configuration-mode/
   */
  mode: 'universal',

  /**
   * Custom source and build directories
   * @see https://nuxtjs.org/api/configuration-srcdir
   * @see https://nuxtjs.org/api/configuration-builddir
   */
  srcDir: './src',
  buildDir: './build',

  /**
   * Nprogress
   * @see https://nuxtjs.org/api/configuration-loading
   */
  loading: { color: colors.primary },

  /**
   * Global CSS
   * @see https://nuxtjs.org/api/configuration-css
   */
  css: ['~/assets/styles/main.css'],

  /**
   * Custom Nuxt plugins
   * @see https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/global-components'],

  /**
   * Custom Nuxt modules
   * @see https://nuxtjs.org/guide/modules/
   * @see https://pwa.nuxtjs.org/
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/sitemap', 'nuxt-fontawesome'],

    /**
   * Nuxt fontawesome module
   * @type {Object}
   */
  fontawesome: {
    component: 'v-icon',
    imports: [
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: config.fontAwesomeIcons.brands
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: config.fontAwesomeIcons.regular
      },
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: config.fontAwesomeIcons.solid
      }
    ]
  },

  /**
   * Sitemap
   * @see https://github.com/nuxt-community/sitemap-module
   */
  sitemap: {
    path: '/sitemap.xml',
    hostname: config.url,
    generate: true
  },

  /**
   * Head of the page
   * @see https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: config.name,
    titleTemplate: `%s - ${config.name}`,
    htmlAttrs: { lang: config.lang },
    bodyAttrs: { itemscope: true, itemtype: 'http://schema.org/WebPage' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: config.description }
    ],
    link: [
      // https://fonts.googleapis.com/css?family=Vollkorn:400,700
      { rel: 'preload', as: 'style', onload: 'this.rel = "stylesheet"', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400' },
      // <link
      //   rel="preload"
      //   as="style"
      //   onload="this.rel = 'stylesheet'"
      //   href='https://fonts.googleapis.com/css?family=Roboto:100,900|Material+Icons'>
      { rel: 'preload', href: '/fonts/Brown-Light.woff2', as: 'font', type: 'font/woff2' },
      { rel: 'preload', href: '/fonts/Brown-Regular.woff2', as: 'font', type: 'font/woff2' },
      { rel: 'preload', href: '/fonts/Relative-Faux.woff2', as: 'font', type: 'font/woff2' }
    ]
  },

  /**
   * Static site generation
   * @see https://nuxtjs.org/api/configuration-generate
   */
  generate: {
    dist: './dist',
    interval: 1
  },

  /**
   * Webpack build process
   * @see https://nuxtjs.org/api/configuration-build
   */
  build: {
    /**
     * Extract CSS to seperate file
     * @see https://nuxtjs.org/api/configuration-build#extractcss
     */
    extractCSS: true,

    /**
     * Custom webpack plugins
     * @see https://nuxtjs.org/api/configuration-build#plugins
     */
    plugins: [
      new StylelintPlugin(),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/pages/**/*.vue'),
          path.join(__dirname, './src/layouts/**/*.vue'),
          path.join(__dirname, './src/components/**/*.vue')
        ]),
        extractors: [
          {
            extractor: class TailwindExtractor {
              static extract(content) {
                return content.match(/[A-z0-9-:/]+/g) || []
              }
            },
            extensions: ['html', 'js', 'vue', 'css', 'scss']
          }
        ],
        whitelist: ['html', 'body', 'svg'],
        whitelistPatterns: purgecssWhitelistPatterns
      })
    ],

    /**
     * Extend webpack build progress
     * @see https://nuxtjs.org/api/configuration-build#extend
     * @param {object} config Webpack configuration
     * @param {object} param1 Nuxt context
     */
    extend(config, { isDev }) {
      /**
       * Resolve custom aliases
       */
      for (const key in aliases) {
        config.resolve.alias[key] = aliases[key]
      }

      /**
       * Enable tree shaking for FontAwsome
       */
      // config.resolve.alias['@fortawesome/fontawesome-free-brands$'] = '@fortawesome/fontawesome-free-brands/shakable.es.js'
      // config.resolve.alias['@fortawesome/fontawesome-free-regular$'] = '@fortawesome/fontawesome-free-regular/shakable.es.js'

      /**
       * Enable postcss style-tag in Vue files
       * @see https://github.com/nuxt/nuxt.js/issues/3231#issuecomment-381885334
       */
      config.module.rules.push({
        test: /\.postcss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader'
          }
        ]
      })

      /**
       * Run eslint on save
       */
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
