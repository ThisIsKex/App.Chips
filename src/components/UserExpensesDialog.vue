<template>
  <v-dialog :model-value="open" width="400" @update:modelValue="$emit('update:open', $event)">
    <v-card class="mt-4">
      <v-card-title>Your expenses</v-card-title>
      <v-card-text>
        <v-row v-for="userExpense in userExpenses" :key="userExpense.id" dense>
          <v-col cols="9"> {{ userExpense.expenseAmount }} € </v-col>
          <v-col cols="3"
            ><v-btn @click="() => deleteUserExpense(userExpense.id)" text="Delete"
          /></v-col>
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
import { useExpenseStore, type ExpenseResponse } from "../stores/ExpenseStore";
import type { UserResponse } from "../stores/UserStore";

const { expenses, currentUser, open } = defineProps<{
  expenses: Array<ExpenseResponse>;
  currentUser: UserResponse;
  open: boolean;
}>();
const emit = defineEmits<{
  (event: "update:open", value: boolean): void;
  (event: "delete:expenses", value: string): void;
}>();

const expenseStore = useExpenseStore();

const userExpenses = computed(() => {
  return expenses.filter((x) => x.expenseUserId === currentUser.id);
});

async function deleteUserExpense(id: string) {
  const deletedId = await expenseStore.deleteUserExpense(id);
  if (!deletedId) {
    return;
  }
  emit("delete:expenses", deletedId);
}
</script>
