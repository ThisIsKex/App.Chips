<template>
  <loading-overlay :show="isLoading" />
  <v-row v-if="!isLoading && session && currentUser" justify="center">
    <user-expenses-dialog
      :current-user="currentUser"
      :expenses="expenses"
      @delete:expenses="deleteExpense"
      v-model:open="userExpensesDialogOpen"
    />
    <div class="share-button">
      <v-btn icon="mdi-share-variant" @click="copyUrl"></v-btn>
    </div>
    <div class="user-expenses-button">
      <v-btn
        icon="mdi-cash-multiple"
        @click="userExpensesDialogOpen = !userExpensesDialogOpen"
      ></v-btn>
    </div>

    <v-col cols="12">
      <v-container>
        <v-card>
          <v-card-title> Session - {{ session?.sessionName }} </v-card-title>
          <v-card-text>
            <v-chip color="primary">{{ currentUser.username }}</v-chip>
          </v-card-text>
        </v-card>
        <create-expense
          :session-id="sessionId"
          :user-id="currentUser.id"
          @add:expense="addExpense"
        />
        <expenses-card :expenses="expenses" :users="users" :current-user="currentUser" />
        <transactions-card :expenses="expenses" :users="users" :current-user="currentUser" />
      </v-container>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import CreateExpense from "../components/CreateExpense.vue";
import ExpensesCard from "../components/ExpensesCard.vue";
import LoadingOverlay from "../components/LoadingOverlay.vue";
import TransactionsCard from "../components/TransactionsCard.vue";
import UserExpensesDialog from "../components/UserExpensesDialog.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { type CashSession } from "../API";
import router from "../router";
import { useCashSessionStore } from "../stores/CashSessionStore";
import { useExpenseStore, type ExpenseResponse } from "../stores/ExpenseStore";
import { useUserStore, type UserResponse } from "../stores/UserStore";

const sessionId = ref<string>("");
const session = ref<CashSession | null>(null);
const currentUser = ref<UserResponse | null>(null);
const users = ref<Array<UserResponse>>([]);
const isLoading = ref<boolean>(false);
const expenses = ref<Array<ExpenseResponse>>([]);

const userExpensesDialogOpen = ref<boolean>(false);

const userStore = useUserStore();
const casSessionStore = useCashSessionStore();
const expenseStore = useExpenseStore();

function copyUrl() {
  const url = document.location.href;
  console.log(url);

  navigator.clipboard.writeText(url);
}

function handleGoBack() {
  sessionId.value
    ? router.push({ name: "join", params: { id: sessionId.value } })
    : router.push({ name: "join" });
}

function deleteExpense(deletedExpenseId: string) {
  const index = expenses.value.findIndex((x) => x.id === deletedExpenseId);
  expenses.value.splice(index, 1);
}

function addExpense(expense: ExpenseResponse) {
  expenses.value.push(expense);
}

onMounted(async () => {
  const route = useRoute();

  sessionId.value = route.params.id as string;
  const userId = localStorage.getItem(sessionId.value);

  if (!sessionId.value) {
    handleGoBack();
    return;
  }

  if (!userId) {
    handleGoBack();
    return;
  }

  isLoading.value = true;
  session.value = await casSessionStore.getSession(sessionId.value);

  users.value = await userStore.listSessionUsers(sessionId.value);
  currentUser.value = users.value.find((x) => x?.id === userId)!;

  expenses.value = await expenseStore.listAllSessionExpenses(sessionId.value);
  isLoading.value = false;
});
</script>
<style>
.share-button {
  position: absolute;
  top: 27px;
  right: -50px;
}

.user-expenses-button {
  position: absolute;
  top: 85px;
  right: -50px;
}
</style>
