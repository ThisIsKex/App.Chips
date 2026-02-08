<template>
  <div>
    <loading-overlay :show="isLoading" />
    <v-row v-if="!isLoading && session && currentUser" justify="center">
    <user-expenses-dialog :current-user="currentUser" :expenses="session.expenses" @delete:expenses="deleteExpense"
      v-model:open="userExpensesDialogOpen" />
    <div class="share-button">
      <v-btn icon="mdi-share-variant" @click="copyUrl"></v-btn>
    </div>
    <div class="user-expenses-button">
      <v-btn icon="mdi-cash-multiple" @click="userExpensesDialogOpen = !userExpensesDialogOpen"></v-btn>
    </div>

    <v-col cols="12">
      <v-container>
        <v-card>
          <v-card-title> Session - {{ session?.name }} </v-card-title>
          <v-card-text>
            <v-chip color="primary">{{ currentUser.name }}</v-chip>
          </v-card-text>
        </v-card>
        <create-expense :session-id="sessionId" :user-id="currentUser.id" @add:expense="addExpense" />
        <expenses-card :cash-session="session" :current-user="currentUser" />
        <transactions-card :cash-session="session" :current-user="currentUser" />
      </v-container>
    </v-col>
  </v-row>
  </div>
</template>
<script setup lang="ts">
import CreateExpense from "../components/CreateExpense.vue";
import ExpensesCard from "../components/ExpensesCard.vue";
import LoadingOverlay from "../components/LoadingOverlay.vue";
import TransactionsCard from "../components/TransactionsCard.vue";
import UserExpensesDialog from "../components/UserExpensesDialog.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import { useCashSessionStore } from "../stores/CashSessionStore";
import type { CashSession, User } from "@/interfaces/cashSession";

const sessionId = ref<string>("");
const session = ref<CashSession | null>(null);
const currentUser = ref<User | null>(null);
const isLoading = ref<boolean>(false);

const userExpensesDialogOpen = ref<boolean>(false);

const cashSessionStore = useCashSessionStore();

function copyUrl() {
  const url = document.location.href;
  navigator.clipboard.writeText(url);
}

async function deleteExpense(deletedExpenseId: string) {
  const deleteResult = await cashSessionStore.deleteExpense(sessionId.value, deletedExpenseId);
  if (!deleteResult) {
    return;
  }
  session.value = deleteResult;
}

async function addExpense(amount: number) {
  const addResult = await cashSessionStore.addExpense(sessionId.value, { userId: currentUser.value!.id, amount: amount });
  if (!addResult) {
    return;
  }
  session.value = addResult;
}

function handleGoBack() {
  sessionId.value
    ? router.push({ name: "join", params: { id: sessionId.value } })
    : router.push({ name: "join" });
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
  session.value = await cashSessionStore.getSession(sessionId.value);
  currentUser.value = session.value?.users.find((x) => x?.id === userId)!;
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
