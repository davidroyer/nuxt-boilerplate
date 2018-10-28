import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
import axios from 'axios'
import glob from 'glob-all'
import aliases from './aliases.config'
import config from './config/site'
import { colors } from './config/tailwind'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import StylelintPlugin from 'stylelint-webpack-plugin'

const SiteUrl = process.env.NODE_ENV === 'production' ? config.url : 'http://localhost:3004'
const purgecssWhitelistPatterns = [/^__/, /^fa/, /^v-/, /^page-/, /^nuxt/, /^scale/, /^slide/, /^enter/, /^leave/]
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || []
  }
}

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(builder.nuxt.options.buildDir, 'extra-file')
        fs.writeFileSync(extraFilePath, 'Something extra')
      },
      async before(nuxt, buildOptions) {
        const baseURL = 'https://got2dance.wpapi.app/wp-json/wp/v2'
        const instance = axios.create({ baseURL })
        const EndpointsArray = [
          'posts',
          'users',
          'pages'
        ]
        console.log('STARTING BEFORE HOOK... ')
        
        EndpointsArray.forEach(async (endpoint) => {
          let dataFilePath
          const {data, request} = await instance.get(`/${endpoint}`)
          dataFilePath = path.join(`${nuxt.options.srcDir}/api`, request.path + '.json')
          dataFilePath = dataFilePath.replace('/wp-json/wp/v2', '')        
          await mkdirp(path.dirname(dataFilePath))
          fs.writeFileSync(dataFilePath, JSON.stringify(data))
        }) 

        // let usersDataFilePath
        // let postsDataFilePath

        // const usersResponse = await instance.get('/users')
        // const postsResponse = await instance.get('/posts')

        // usersDataFilePath = path.join(`${nuxt.options.srcDir}/api`, usersResponse.request.path + '.json')
        // usersDataFilePath = usersDataFilePath.replace('/wp-json/wp/v2', '')        
        // postsDataFilePath = path.join(`${nuxt.options.srcDir}/api`, postsResponse.request.path + '.json')
        // postsDataFilePath = postsDataFilePath.replace('/wp-json/wp/v2', '')        

        // await mkdirp(path.dirname(usersDataFilePath))
        // await mkdirp(path.dirname(postsDataFilePath))

        // fs.writeFileSync(usersDataFilePath, JSON.stringify(usersResponse.data))
        // fs.writeFileSync(postsDataFilePath, JSON.stringify(postsResponse.data))


        // console.log('nuxt: ', nuxt)
        // console.log('options: ', nuxt.options)
        // console.log('GET DATA HERE!')
      },      
      // before(builder) {
      //   console.log('GET DATA HERE!')
      // },     
    }
  },  
  watch: ['@@/config/*.js'],
  
  server: {
    port: 3004 // default: 3000
  },
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
  // buildDir: './build',

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
  plugins: ['~/plugins/meta'],

  /**
   * Custom Nuxt modules
   * @see https://nuxtjs.org/guide/modules/
   * @see https://pwa.nuxtjs.org/
   */
  modules: [
    '~/modules/global-components',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
     'nuxt-fontawesome'
    ],

  'google-analytics': {
    id: config.analyticsID
  },
  /**
   * Nuxt fontawesome module
   * @type {Object}
   */
  fontawesome: {
    component: 'fa-icon'
    // imports: [
    //   {
    //     set: '@fortawesome/free-brands-svg-icons',
    //     icons: config.fontAwesomeIcons.brands
    //   },
    //   {
    //     set: '@fortawesome/free-regular-svg-icons',
    //     icons: config.fontAwesomeIcons.regular
    //   },
    //   {
    //     set: '@fortawesome/free-solid-svg-icons',
    //     icons: config.fontAwesomeIcons.solid
    //   }
    // ]
  },

  /**
   * Sitemap
   * @see https://github.com/nuxt-community/sitemap-module
   */
  sitemap: {
    path: '/sitemap.xml',
    hostname: SiteUrl,
    generate: true
  },

  /**
   * Head of the page
   * @see https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: `%s - ${config.title}`,
    htmlAttrs: { lang: config.lang },
    bodyAttrs: { itemscope: true, itemtype: 'http://schema.org/WebPage' },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: config.description },
      // { hid: 'robots', name: 'robots', content: config.index === false ? 'noindex,nofollow' : 'index,follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: config.title },
      { hid: 'og:title', property: 'og:title', content: config.title },
      { hid: 'og:description', property: 'og:description', content: config.description },
      { hid: 'og:image', property: 'og:image', content: `${SiteUrl}/${config.ogImage}` },
      { hid: 'twitter:title', name: 'twitter:title', content: config.title },
      { hid: 'twitter:description', name: 'twitter:description', content: config.description },
      { hid: 'twitter:image', name: 'twitter:image', content: `${SiteUrl}/${config.ogImage}` }
    ],
    link: [
      { rel: 'preload', href: '/fonts/vollkorn-v8-latin-regular.woff2', as: 'font', type: 'font/woff2' },
      { rel: 'preload', href: '/fonts/vollkorn-v8-latin-700.woff2', as: 'font', type: 'font/woff2' },
      { rel: 'preload', href: '/fonts/open-sans-v15-latin-regular.woff2', as: 'font', type: 'font/woff2' }
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
    plugins: [new StylelintPlugin()],

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

      if (!isDev) {
        config.plugins.push(
          /**
           * PurgeCSS
           * @see https://github.com/FullHuman/purgecss
           */
          new PurgecssPlugin({
            keyframes: false,
            paths: glob.sync([
              path.join(__dirname, './src/pages/**/*.vue'),
              path.join(__dirname, './src/layouts/**/*.vue'),
              path.join(__dirname, './src/components/**/*.vue')
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ['html', 'js', 'vue', 'css', 'scss']
              }
            ],
            whitelist: ['html', 'body', 'nuxt-progress', 'svg'],
            whitelistPatterns: purgecssWhitelistPatterns
          })
        )
      }
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
