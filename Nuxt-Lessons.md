# Nuxt Lessons

## Environmental Variables

If you're using `@nuxtjs/dotenv`
The key to getting this to work at runtime using Netlify builds is seting `{systemvars: true}` like so: 
```js
['@nuxtjs/dotenv', { systemvars: true }]
```

## Browsersupport

### For CSS

Configure this in your `package.json` such as:

```json
{
  "browserslist": [">1%", "ie > 8"]
}
```

### For JS

While looking into how to do this, I discovered Nuxt already supports IE9 and up so I was more than happy with that.


## PurgeCSS

PurgeCSS doesn't work unless you set `extractCSS: true`

## Font Awesome

If you are using the `nuxt-fontawesome` module [link here], you don't have to set the icons you want. You will still get tree-shaking and you can import your icons whereever you want and add them like so

### Using `nuxt-fontawesome`

#### In a `.vue` file

```js
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEdit,
  faChevronRight,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faChevronRight, faTimesCircle)
```

#### In `nuxt.config.js`

```js
{
  fontawesome: {
    component: 'fa-icon'
  },
}
```

### Using Font Awesome with PurgeCSS
 If you're using PurgeCSS to remove unused CSS and you find that the font awesome styles are getting removed when building for production, add `/^fa-/, /^svg-/` to the array for `whitelistPatterns` property for the PurgeCSS config such as:

```js
whitelistPatterns: [/^__/, /^fa-/, /^svg-/]
```

## Watching Config Files

Nuxt will restart the server when any `js` files inside the `config` directory are edited.

```js
watch: ['@@/config/*.js']
```

Better Generate Code

```js
  generate: {
    async routes() {
      const baseUrl = 'https://demo1.wpapi.app/wp-json/wp/v2'
      const Endpoints = [
        'posts',
        'users',
        'pages'
      ]
      let routesArray = []

      for (const endpoint of Endpoints) {
        const { data } = await axios.get(`${baseUrl}/${endpoint}`)
        const endpointRoutes = data.map(endpointItem => `/${endpoint}/${endpointItem.id}`)
        routesArray.push(...endpointRoutes)
      }
      return routesArray
    }
  }
```
