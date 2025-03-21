<template>
  <v-card class="mt-4">
    <v-card-title>Expenses</v-card-title>
    <v-card-text>
      <v-row v-for="user in cashSession.users" :key="user.id" dense>
        <v-col cols="6">
          <v-chip :color="user.id === currentUser.id ? 'primary' : 'secondary'">{{
            user.name
          }}</v-chip>
        </v-col>
        <v-col cols="6">
          <v-chip variant="outlined" color="info">
            {{ getUserExpenses(cashSession.expenses, user.id) }} €
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import type { CashSession, User } from "@/interfaces/cashSession";
import { getUserExpenses } from "@/services/calculation";

defineProps<{ cashSession: CashSession, currentUser: User }>();
</script>
