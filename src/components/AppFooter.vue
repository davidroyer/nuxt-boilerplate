<template>
  <footer role="contentinfo"
          itemscope
          itemtype="http://schema.org/WPFooter">

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

