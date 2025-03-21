<template>
  <div class="text-center">
    <v-overlay :model-value="show" class="align-center justify-center">
      <v-row>
        <v-progress-circular
          color="primary"
          indeterminate
          :size="84"
          :width="9"
        ></v-progress-circular>
      </v-row>
      <v-row justify="center">
        {{ text }}
      </v-row>
    </v-overlay>
  </div>
</template>
<script setup lang="ts">
defineProps<{ show: boolean; text?: string }>();
</script>
