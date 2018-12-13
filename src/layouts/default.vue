<template>
  <div id="app-wrapper">
    <app-header />
    <app-body />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import AppBody from '@/components/AppBody'

export default {
  components: { AppHeader, AppFooter, AppBody }
}
</script>

<style>
#app-wrapper {
    display: flex;
    flex-direction: column;
    flex-flow: column wrap;
    min-height: 100vh;  
}
</style>
