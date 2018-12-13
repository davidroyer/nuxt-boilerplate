<template>
  <footer class="footer" role="contentinfo" itemscope itemtype="http://schema.org/WPFooter">

    <div v-html="fullYear"/>         
  </footer>
</template>

<script>

export default {
  name: 'AppFooter',
  computed: {
    fullYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style>
.footer {
  padding: .5rem 1rem;
  @apply bg-grey-light;
}
</style>
