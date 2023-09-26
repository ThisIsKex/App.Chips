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
import { useExpenseStore } from "../stores/ExpenseStore";

const expense = ref<number>();

const props = defineProps<{ sessionId: string; userId: string }>();
const expenseStore = useExpenseStore();

async function createExpense() {
  if (!expense.value) {
    return;
  }

  const result = await expenseStore.create(props.sessionId, props.userId, expense.value);
  console.log(result);
  expense.value = null!;
}
</script>
