<template>
  <v-card class="mt-4">
    <v-card-title>Transactions</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">Total amount: {{ sum.toFixed(2) }} €</v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12"> Amount to pay per Person: {{ amountToPayPerUser.toFixed(2) }} € </v-col>
      </v-row>
      <v-row v-for="transaction in transactions" :key="transaction.id" dense>
        <v-col cols="3"> {{ transaction.debtor }} </v-col>
        <v-col cols="3"> ows </v-col>
        <v-col cols="3"> {{ transaction.creditor }} </v-col>
        <v-col cols="3"> {{ transaction.amount.toFixed(2) }} € </v-col>
      </v-row>
      <v-row v-if="transactions.length === 0">
        <v-col cols="12">No transactions left for this session.</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Transaction } from "../interfaces/calculation";
import { calculateTotalExpenses, calculateTransactions } from "../services/calculation";
import type { ExpenseResponse } from "../stores/ExpenseStore";
import type { UserResponse } from "../stores/UserStore";

const props = defineProps<{
  expenses: Array<ExpenseResponse>;
  users: Array<UserResponse>;
}>();

const transactions = ref<Transaction[]>([]);
const amountToPayPerUser = ref<number>(0);
const sum = ref<number>(0);

onMounted(() => {
  sum.value = calculateSum();
  amountToPayPerUser.value = sum.value / props.users.length;

  const participants = calculateTotalExpenses(
    props.expenses,
    props.users,
    amountToPayPerUser.value
  );

  transactions.value = calculateTransactions(participants);
});

function calculateSum() {
  return props.expenses.map((x) => x.expenseAmount).reduce((a, b) => a + b, 0);
}
</script>
