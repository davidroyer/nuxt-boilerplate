import Meta from '@/data/meta.js'
import Vue from 'vue'

Vue.prototype.$createSeo = function(slug, baseMetaArray = []) {
  return Object.entries(Meta[slug]).reduce((acc, [key, actualValue]) => {
    let title = Meta[slug].title
    let description = Meta[slug].description

    const defaultMetaArray = [
      // {
      //   name: 'og:url',
      //   content: `${process.env.baseUrl}${this.$route.path.substr(1)}`
      // },
      {
        name: 'og:title',
        content: title
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'og:description',
        content: description
      },
      {
        name: 'twitter:description',
        content: description
      }
    ]

    // If meta, add base array (likely og:image) and defaultArray containing og:url
    const valueForKey =
      key !== 'meta'
        ? actualValue
        : wrap(actualValue)
            .concat(defaultMetaArray, baseMetaArray)
            .reduce(
              (acc, metaObject) =>
                acc.concat(retrieveMetaObjectArray(metaObject)),
              []
            )

    return { ...acc, [key]: valueForKey }
  }, {})
}

const wrap = a => (Array.isArray(a) ? a : [a])

const retrieveMetaObjectArray = metaObject => {
  const wrappedName = wrap(metaObject.name)

  return wrappedName.map(n => ({
    hid: n,
    name: n,
    property: n,
    // Fix url when the meta information is og:image
    content: wrappedName.includes('og:image')
      ? process.env.baseUrl + metaObject.content.substr(1)
      : metaObject.content
  }))
}
