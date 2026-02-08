<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app class="app-wrapper">
    <v-main>
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </v-main>
  </v-app>
</template>

<style>
.app-wrapper {
  background: transparent !important;
}

.v-main {
  background: transparent !important;
}
</style>

<style scoped>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

