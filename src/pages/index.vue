<template>
  <section>
    <h1>
      Welcome to Nuxt!
    </h1>
    <h6>Heading 6</h6>
  </section>
</template>
<script>

export default {
  head () {
    return this.$createSeo('index')
  }
}
</script>
