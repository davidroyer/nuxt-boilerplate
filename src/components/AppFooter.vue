<template>
  <footer role="contentinfo"
          itemscope
          itemtype="http://schema.org/WPFooter">
    <!-- <font-awesome-icon :icon="['fab', 'font-awesome']" />
    <font-awesome-icon :icon="['far', 'bell']" /> -->
    <!-- <fa-icon style="font-size: 30px" 
             icon="chevron-right"/>
    <fa-icon style="font-size: 30px" 
             icon="edit"/>
    <fa-icon style="font-size: 30px" 
             icon="times-circle"/> -->
    <fa-icon icon="chevron-right" 
size="2x" />             
    <fa-icon icon="edit" 
size="4x" />             
    <fa-icon icon="times-circle" 
size="6x" />             
  </footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEdit,
  faChevronRight,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faChevronRight, faTimesCircle)
export default {
  name: 'AppFooter',
  computed: {
    fullYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

