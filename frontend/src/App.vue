<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  height: calc(90vh);
  width: calc(80vw);
  margin: 20px auto;
  position: relative;
}
</style>
