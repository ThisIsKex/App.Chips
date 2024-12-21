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
import type { CashSession, User } from "@/interfaces/cashSession";

const props = defineProps<{
  cashSession: CashSession;
  currentUser: User;
}>();

const sum = computed(() => {
  return calculateSum();
});

const transactions = computed(() => {
  const participants = calculateTotalExpenses(
    props.cashSession.expenses,
    props.cashSession.users,
    amountToPayPerUser.value
  );

  return calculateTransactions(participants);
});

const amountToPayPerUser = computed(() => {
  return sum.value / props.cashSession.users.length;
});

onMounted(() => { });

function calculateSum() {
  const sum = props.cashSession.expenses.map((x) => x.amount).reduce((a, b) => a + b, 0);
  return sum;
}
</script>
