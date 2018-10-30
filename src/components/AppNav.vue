<template>
  <nav role="navigation"
       itemscope
       itemtype="http://schema.org/SiteNavigationElement">
    <ul class="nav-list">
      <nuxt-link to="/"
                 tag="li">
        <a itemprop="url">
          <span itemprop="name">
            Home
          </span>
        </a>
      </nuxt-link>
      <nuxt-link to="/examples" 
                 tag="li">
        <a itemprop="url">
          <span itemprop="name">Examples</span>
        </a>
      </nuxt-link>
      <nuxt-link to="/projects" 
                 tag="li">
        <a itemprop="url">
          <span itemprop="name">Projects</span>
        </a>
      </nuxt-link>

      <nuxt-link to="/pages" 
                 tag="li">
        <a itemprop="url">
          <span itemprop="name">Pages</span>
        </a>
      </nuxt-link>
      <nuxt-link to="/posts" 
                 tag="li">
        <a itemprop="url">
          <span itemprop="name">Posts</span>
        </a>
      </nuxt-link>             
    </nuxt-link></ul>
  </nav>
</template>

<style scoped>
.nav-list {
  @apply list-reset;
}
</style>
