<template>
  <div>
    <h3>{{ page.title.rendered }}</h3>
    <p>{{ page.id }}</p>
    <router-link to="/pages">&larr; go back</router-link>
    <div class="content" 
         v-html="page.content.rendered"/>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const page = await app.$wp.page(params.slug)
    return {
      page
    }
  },

  head() {
    return {
      title: `${this.page.title.rendered}`
    }
  }
}
</script>