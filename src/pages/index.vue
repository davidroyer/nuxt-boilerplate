<template>
  <section>
    <h1>
      Welcome to Nuxt!
    </h1>
    <h6>Heading 6</h6>
    <hr>
    <h2>Users</h2>
    <pre>{{ users }}</pre>
    <hr>
    <h2>Posts</h2>
    <pre>{{ posts }}</pre>
    <hr>
    <h2>Pages</h2>
    <pre>{{ pages }}</pre>
  </section>
</template>
<script>
import posts from '@/api/posts'
import users from '@/api/users'
import pages from '@/api/pages'
export default {
  asyncData() {
    // const { data } = await axios.get('/users')
    return {
      users,
      posts,
      pages
    }
  },
  head () {
    return this.$createSeo('index')
  }
}
</script>
