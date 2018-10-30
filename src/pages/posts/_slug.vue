<template>
  <div>
    <h3>{{ post.title.rendered }}</h3>
    <p>{{ post.id }}</p>
    <router-link to="/pages">&larr; go back</router-link>
    <div class="content" 
         v-html="post.content.rendered"/>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const post = await app.$wp.post(params.slug)
    return {
      post
    }
  },

  head() {
    return {
      title: `${this.post.title.rendered}`
    }
  }
}
</script>