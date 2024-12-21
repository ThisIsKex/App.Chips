<template>
  <v-card class="mt-4">
    <v-card-title>Create Expense</v-card-title>
    <v-card-text>
      <v-text-field label="Expense" type="number" v-model="expense"></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="createExpense" color="primary"> Create </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from "vue";

const expense = ref<number>();

const emit = defineEmits<{
  (event: "add:expense", value: number): void;
}>();

function createExpense() {
  if (!expense.value) {
    return;
  }

  emit("add:expense", expense.value);
  expense.value = null!;
}
</script>
