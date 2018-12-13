import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
import glob from 'glob-all'
import aliases from './aliases.config'
import config from './config/site'
import {
  colors
} from './config/tailwind'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import StylelintPlugin from 'stylelint-webpack-plugin'

const typographyConfig = require('./config/typography')
const tailwindConfig = require('./config/tailwind')

const SiteUrl = process.env.NODE_ENV === 'production' ? config.url : 'http://localhost:3004'
const purgecssWhitelistPatterns = [/^__/, /^fa-/, /^svg-/, /^v-/, /^page-/, /^nuxt/, /^scale/, /^slide/, /^enter/, /^leave/]


export default {
  hooks: {
    build: {
      async before(nuxt, buildOptions) {}
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

  env: {},
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
  loading: {
    color: colors.primary
  },

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
    'nuxt-fontawesome',
    'nuxt-purgecss',
    'nuxt-webfontloader'
  ],

  /**
   * Remove unused CSS Styles, LINK HERE
   */
  purgeCSS: {
    mode: 'postcss',
    paths: [
      path.join(__dirname, './src/pages/**/*.vue'),
      path.join(__dirname, './src/layouts/**/*.vue'),
      path.join(__dirname, './src/components/**/*.vue')
    ],
    whitelistPatterns: purgecssWhitelistPatterns
  },

  webfontloader: {
    google: {
      families: ['Open Sans:400', 'Vollkorn:400,700'] // Loads Lato font with weights 400 and 700
    }
  },

  'google-analytics': {
    id: config.analyticsID
  },
  /**
   * Nuxt fontawesome module
   * @type {Object}
   */
  fontawesome: {
    component: 'fa-icon'
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
    htmlAttrs: {
      lang: config.lang
    },
    bodyAttrs: {
      itemscope: true,
      itemtype: 'http://schema.org/WebPage'
    },

    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      {
        'http-equiv': 'x-ua-compatible',
        content: 'ie=edge'
      },
      {
        hid: 'description',
        name: 'description',
        content: config.description
      },
      // { hid: 'robots', name: 'robots', content: config.index === false ? 'noindex,nofollow' : 'index,follow' },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:site_name',
        content: config.title
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: config.title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: config.description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${SiteUrl}/${config.ogImage}`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: config.title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: config.description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: `${SiteUrl}/${config.ogImage}`
      }
    ]
    // link: [{
    //     rel: 'preload',
    //     href: '/fonts/vollkorn-v8-latin-regular.woff2',
    //     as: 'font',
    //     type: 'font/woff2'
    //   },
    //   {
    //     rel: 'preload',
    //     href: '/fonts/vollkorn-v8-latin-700.woff2',
    //     as: 'font',
    //     type: 'font/woff2'
    //   },
    //   {
    //     rel: 'preload',
    //     href: '/fonts/open-sans-v15-latin-regular.woff2',
    //     as: 'font',
    //     type: 'font/woff2'
    //   }
    // ]
  },

  /**
   * Static site generation
   * @see https://nuxtjs.org/api/configuration-generate
   */
  generate: {},

  /**
   * Webpack build process
   * @see https://nuxtjs.org/api/configuration-build
   */

  build: {
    postcss: {
      plugins: {
        tailwindcss: tailwindConfig,
        'postcss-import': {},
        'postcss-responsive-type': {},
        'postcss-typography': typographyConfig,
        'postcss-easing-gradients': {},
        'postcss-animation': {},
        'postcss-nested': {},
        'postcss-preset-env': {},
        'css-mqpacker': { sort: true },      
        autoprefixer: {}
      }
    },

    /**
     * Extend webpack build progress
     * @see https://nuxtjs.org/api/configuration-build#extend
     * @param {object} config Webpack configuration
     * @param {object} param1 Nuxt context
     */
    extend(config, {
      isDev
    }) {

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
