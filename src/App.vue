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
