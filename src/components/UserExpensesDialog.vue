<template>
  <v-dialog :model-value="open" width="400" @update:modelValue="$emit('update:open', $event)">
    <v-card class="mt-4">
      <v-card-title>Your expenses</v-card-title>
      <v-card-text>
        <v-row v-for="userExpense in userExpenses" :key="userExpense.id" dense>
          <v-col cols="9"> {{ userExpense.amount }} € </v-col>
          <v-col cols="3"><v-btn @click="() => deleteUserExpense(userExpense.id)" text="Delete" /></v-col>
        </v-row>
        <v-row v-if="userExpenses.length === 0">
          <v-col cols="12">No transactions done for this session.</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { Expense, User } from "@/interfaces/cashSession";

const { expenses, currentUser, open } = defineProps<{
  expenses: Array<Expense>;
  currentUser: User;
  open: boolean;
}>();
const emit = defineEmits<{
  (event: "update:open", value: boolean): void;
  (event: "delete:expenses", value: string): void;
}>();


const userExpenses = computed(() => {
  return expenses.filter((x) => x.userId === currentUser.id);
});

function deleteUserExpense(id: string) {
  emit("delete:expenses", id);
}
</script>
