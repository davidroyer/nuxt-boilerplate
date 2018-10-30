<template>
  <div>
    <h3>{{ project.title.rendered }}</h3>
    <p>{{ project.id }}</p>
    <router-link to="/projects">&larr; go back</router-link>
    <div class="content" 
         v-html="project.content.rendered"/>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const project = await app.$wp.project(`${params.slug}`)
    return {
      project
    }
  },

  head() {
    return {
      title: `${this.project.title.rendered}`
    }
  }
}
</script>