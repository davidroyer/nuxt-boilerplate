<template>
  <div>
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
