<template>
  <div>
    <h2>Posts list</h2>
    <ul>
      <li v-for="post in posts" 
          :key="post.id">
        <nuxt-link :to="{ path: `/posts/${post.slug}` }">{{ post.title.rendered }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  async asyncData({app}) {
    const posts = await app.$wp.posts()

    return {
      posts
    }
  },

  head: {
    title: 'Site Posts'
  }
}
</script>