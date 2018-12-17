<template>
  <header role="banner"
itemscope itemtype="http://schema.org/WPHeader">
    <AppLogo />
    <AppNav />
  </header>
</template>

<script>
import AppNav from '@/components/AppNav'
import AppLogo from '@/components/AppLogo'

export default {
  components: { AppNav, AppLogo }
}
</script>

<style>
header {
  @apply bg-grey-darker;
}
</style>
