# Nuxt Lessons

## Environmental Variables

The key to getting this to work at runtime using Netlify builds was seting `{systemvars: true}`

## CSS Browsersupport

Configure this in your `package.json` such as:

```json
{
  "browserslist": [">1%", "ie > 8"]
}
```

## PurgeCSS

PurgeCSS doesn't work unless you set `extractCSS: true`

## Font Awesome

If you are using the nuxt-fontawesome module [link here] plus PurgeCSS to remove unused CSS then you'd find that the font awesome styles were getting removed. Add `/^fa-/, /^svg-/` to the array for `whitelistPatterns` property such as:

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
