<template>
  <div id="app">
    <router-view />
    <footer>Mode: {{env}} </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      env: process.env.ENV
    }
  }
}
</script>

<style></style>
