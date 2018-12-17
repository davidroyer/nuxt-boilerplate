<template>
  <div itemscope
itemtype="http://schema.org/Organization" itemprop="publisher">
    <NuxtLink to="/" itemprop="url">
      <span itemscope itemtype="http://schema.org/ImageObject" itemprop="logo">
        <img itemprop="url" class="logo-image" src="@/assets/images/logo.png" alt="Nuxt">
      </span>
    </NuxtLink>
  </div>
</template>

<style>
.logo-image {
  @apply w-12 h-12;
}
</style>
