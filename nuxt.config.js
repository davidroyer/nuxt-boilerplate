import path from 'path'
import siteConfig from './config/site'
import purgeConfig from './config/purgecss'
import { colors } from './config/tailwind'

const typographyConfig = require('./config/typography')
const tailwindConfig = require('./config/tailwind')

const purgecssWhitelistPatterns = [
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

const SiteUrl =
  process.env.NODE_ENV === 'production'
    ? siteConfig.url
    : 'http://localhost:3004'

export default {
  hooks: {
    build: {
      async before(nuxt, buildOptions) {}
    }
  },

  srcDir: './src',

  watch: ['@@/config/*.js'],

  loading: {
    color: colors.primary
  },

  head: {
    titleTemplate: `%s - ${siteConfig.title}`,
    htmlAttrs: {
      lang: siteConfig.lang
    },
    bodyAttrs: {
      itemscope: true,
      itemtype: 'http://schema.org/WebPage'
    },

    meta: [
      {
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
        content: siteConfig.description
      },
      {
        hid: 'robots',
        name: 'robots',
        content:
          siteConfig.index === false ? 'noindex,nofollow' : 'index,follow'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:site_name',
        content: siteConfig.title
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: siteConfig.title
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${SiteUrl}/${siteConfig.ogImage}`
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteConfig.description
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: siteConfig.title
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: `${SiteUrl}/${siteConfig.ogImage}`
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: siteConfig.description
      }
    ]
  },

  css: ['~/assets/styles/main.css'],

  plugins: ['~/plugins/meta'],

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-analytics',
    'nuxt-purgecss',
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    '~/modules/global-components'
  ],

  purgeCSS: {
    mode: 'postcss',
    paths: [
      path.join(__dirname, './src/pages/**/*.vue'),
      path.join(__dirname, './src/layouts/**/*.vue'),
      path.join(__dirname, './src/components/**/*.vue'),
      path.join(__dirname, './src/plugins/**/*.js')
    ],
    whitelistPatterns: purgecssWhitelistPatterns
  },

  webfontloader: {
    google: {
      families: ['Open Sans:400', 'Vollkorn:400,700'] // Loads Lato font with weights 400 and 700
    }
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.(?:googleapis|gstatic).com/(.*)',
        strategyOptions: {
          cacheName: 'google-fonts',
          cacheExpiration: {
            maxEntries: 30,
            maxAgeSeconds: 300
          }
        }
      }
    ]
  },

  'google-analytics': {
    id: siteConfig.analyticsID
  },

  fontawesome: {
    component: 'fa-icon'
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: SiteUrl,
    generate: true
  },

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
        'css-mqpacker': {
          sort: true
        },
        autoprefixer: { grid: true }
      }
    },
    /**
     * Extend webpack build progress
     * @see https://nuxtjs.org/api/configuration-build#extend
     * @param {object} config Webpack configuration
     * @param {object} param1 Nuxt context
     */
    extend(config, { isDev }) {
      /**
       * Run eslint on save
       */
      if (isDev && process.client) {
        siteConfig.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
