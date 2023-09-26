<template>
  <v-card class="mt-4">
    <v-card-title>Expenses</v-card-title>
    <v-card-text>
      <v-row v-for="user in users" :key="user!.id" dense>
        <v-col cols="6">
          <v-chip :color="user.id === currentUser.id ? 'primary' : 'secondary'">{{
            user.username
          }}</v-chip>
        </v-col>
        <v-col cols="6">
          <v-chip variant="outlined" color="info">
            {{ getUserExpenses(expenses, user!.id) }} €
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { getUserExpenses } from "../services/calculation";
import type { ExpenseResponse } from "../stores/ExpenseStore";
import type { UserResponse } from "../stores/UserStore";

defineProps<{ expenses: ExpenseResponse[]; users: UserResponse[]; currentUser: UserResponse }>();
</script>
