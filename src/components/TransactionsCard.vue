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
        <v-col cols="3">
          <v-chip :color="transaction.debtor.id === currentUser.id ? 'primary' : 'secondary'">
            {{ transaction.debtor.name }}
          </v-chip>
        </v-col>
        <v-col cols="3">
          <v-chip variant="text">owes</v-chip>
        </v-col>
        <v-col cols="3">
          <v-chip :color="transaction.creditor.id === currentUser.id ? 'primary' : 'secondary'">
            {{ transaction.creditor.name }}
          </v-chip>
        </v-col>
        <v-col cols="3">
          <v-chip variant="outlined" color="info">{{ transaction.amount.toFixed(2) }} €</v-chip>
        </v-col>
      </v-row>
      <v-row v-if="transactions.length === 0">
        <v-col cols="12">No transactions done for this session.</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { calculateTotalExpenses, calculateTransactions } from "../services/calculation";
import type { ExpenseResponse } from "../stores/ExpenseStore";
import type { UserResponse } from "../stores/UserStore";

const props = defineProps<{
  expenses: Array<ExpenseResponse>;
  users: Array<UserResponse>;
  currentUser: UserResponse;
}>();

const sum = computed(() => {
  return calculateSum();
});

const transactions = computed(() => {
  const participants = calculateTotalExpenses(
    props.expenses,
    props.users,
    amountToPayPerUser.value
  );

  return calculateTransactions(participants);
});

const amountToPayPerUser = computed(() => {
  return sum.value / props.users.length;
});

onMounted(() => {});

function calculateSum() {
  return props.expenses.map((x) => x.expenseAmount).reduce((a, b) => a + b, 0);
}
</script>
