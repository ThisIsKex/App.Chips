<template>
  <v-card class="mt-4">
    <v-card-title>Expenses</v-card-title>
    <v-card-text>
      <v-row v-for="user in users" :key="user!.id" dense>
        <v-col cols="6">
          {{ user.username }}
        </v-col>
        <v-col cols="6"> {{ getUserExpenses(expenses, user!.id) }} € </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { getUserExpenses } from "../services/calculation";
import type { ExpenseResponse } from "../stores/ExpenseStore";
import type { UserResponse } from "../stores/UserStore";

defineProps<{ expenses: ExpenseResponse[]; users: UserResponse[] }>();
</script>
