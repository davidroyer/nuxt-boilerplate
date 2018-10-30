import WpApi from '@/services/wpapi'
import PostTypes from '@/api/post-types'
const apiBaseUrl = process.env.apiBaseUrl

/**
 * Set `$wp` on the `app` instance
 * This way we can use it in middleware and pages `asyncData`/`fetch`
 */
export default ({ app }, inject) => {
  const wp = new WpApi({
    wpSiteUrl: apiBaseUrl
  })
  wp._createCustomPostRoutes(PostTypes)

  app.$wp = wp
  inject('wp', wp)
}
