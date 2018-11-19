<template>
  <section>
    <h1>
      Welcome to Nuxt!
    </h1>
    <hr>
    <h2>Projects</h2>
    <pre>{{ projects.length }}</pre>
    <hr>
    <h2>Posts</h2>
    <pre>{{ posts.length }}</pre>
    <hr>
    <h2>Pages</h2>
    <pre>{{ pages.length }}</pre>
    <hr>
  </section>
</template>
<script>

export default {
  async asyncData ({ app }) {
    console.log(app.$wp)
    const projects = await app.$wp.projects()
    const pages = await app.$wp.pages({
      params: {
        _embed: true
      }
    })
    const posts = await app.$wp.posts({
      _fields: ['id', 'slug'],
      per_page: 5
    })
    return {
      projects,
      pages,
      posts
    }
  },
  head () {
    return this.$createSeo('index')
  }
}
</script>
