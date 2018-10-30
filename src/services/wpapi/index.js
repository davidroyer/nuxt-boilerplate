import axios from 'axios'
import Resources from './api-resources'

const DEFAULTS = {
  namespace: 'wp/v2'
}

export default class WpApi {
  constructor(options) {
    this.options = Object.assign({}, DEFAULTS, options)
    this.axios = this._createAxiosClient()

    /**
     * Set up predefined resources methods.
     */
    this._createDefaultResourceRoutes(Resources)
    // this._createCustomPostRoutes()
  }

  /**
   * Create axios client.
   */
  _createAxiosClient() {
    const options = {
      baseURL: this._createBaseUrl()
    }
    return axios.create(options)
  }

  /**
   * Create base url.
   */
  _createBaseUrl() {
    return `${this.options.wpSiteUrl}/wp-json/wp/v2/`
  }

  /**
   * Generate config for axios request
   */
  setConfig(options) {
    const requestConfig = {
      params: {
        ...options
      }
    }
    return requestConfig
  }

  /**
   * Modify namespace that is used.
   */
  namespace(namespace) {
    this.options.namespace = namespace
    return this
  }

  async postTypes() {
    const { data } = await this.axios.get(`types`)
    return data
  }

  async allSiteData() {
    const { data } = await this.axios.get(`${this.options.wpSiteUrl}/wp-json`)
    return data
  }

  async siteData() {
    const { data } = await this.axios.get(`${this.options.wpSiteUrl}/wp-json`)
    const { name, description, url, home, gmt_offset, timezone_string } = data
    return { name, description, url, home, gmt_offset, timezone_string }
  }

  async _createDefaultResourceRoutes(Resources) {
    Resources.forEach(({ collectionName, singleName }) => {
      this[collectionName] = async options => {
        const { data } = await this.axios.get(`${collectionName}`, this.setConfig(options))
        return data
      }

      if (singleName === 'menu') {
        this[singleName] = async slug => {
          const { data } = await this.axios.get(`${collectionName}/${slug}`)
          return data
        }
      } else {
        this[singleName] = async slug => {
          const { data } = await this.axios.get(`${collectionName}/?slug=${slug}&_embed`)
          return data[0]
        }
      }
    })
  }

  async _createCustomPostRoutes(PostTypes) {
    // const PostTypes = await this.postTypes()

    Object.entries(PostTypes).forEach(([key, postObject]) => {
      const { rest_base } = postObject
      this[rest_base] = async options => {
        const { data } = await this.axios.get(`${rest_base}`, this.setConfig(options))
        return data
      }

      this[`${key}`] = async slug => {
        const { data } = await this.axios.get(`${rest_base}/?slug=${slug}&_embed`)
        return data[0]
      }
    })
  }
}
