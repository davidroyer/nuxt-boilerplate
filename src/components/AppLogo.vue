<template>
  <div itemscope
       itemtype="http://schema.org/Organization"
       itemprop="publisher">
    <router-link to="/"
                 itemprop="url">
      <span itemscope
            itemtype="http://schema.org/ImageObject"
            itemprop="logo">
        <img itemprop="url"
             class="w-12 h-12"
             src="@images/logo.png"
             alt="Nuxt">
      </span>
    </router-link>
  </div>
</template>
