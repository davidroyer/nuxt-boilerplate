<template>
  <div>
    <h2>Projects list</h2>
    <ul>
      <li v-for="project in projects" 
          :key="project.id">
        <nuxt-link :to="{ path: `/projects/${project.slug}` }">{{ project.title.rendered }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  async asyncData({app}) {
    const projects = await app.$wp.projects()

    return {
      projects
    }
  },

  head: {
    title: 'Site projects'
  }
}
</script>