import WpApi from '@/services/wpapi'
import PostTypes from '@/api/post-types'
const apiBaseUrl = process.env.apiBaseUrl

/**
 * Set `$wp` on the `app` instance
 * This way we can use it in middleware and pages `asyncData`/`fetch`
 */
export default (ctx, inject) => {
  const wp = new WpApi({
    url: apiBaseUrl
  })
  wp.createRoutes(PostTypes)
  console.log('NEW TEST: ', wp)
  ctx.$wp = wp
  inject('wp', wp)
}
