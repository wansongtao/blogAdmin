<template>
  <div id="app" @click.capture="'capture';">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
html {
  scroll-behavior: smooth;
}
</style>
