<template>
  <loading-overlay :show="isLoading" />
  <v-row justify="center">
    <v-col cols="6">
      <v-container>
        <v-card v-if="sessionId">
          <v-card-title> {{ sessionId ? "Join session" : "Create session" }}</v-card-title>
          <v-card-text>
            <v-text-field label="Username" v-model="username" />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click="joinSession" color="primary">Join</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-title>Create session</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Session name" v-model="sessionName" />
                <v-text-field label="Username" v-model="username" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click="createSession" color="primary">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import LoadingOverlay from "../components/LoadingOverlay.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import { useCashSessionStore } from "../stores/CashSessionStore";
import { useUserStore } from "../stores/UserStore";

const username = ref<string>("");
const sessionName = ref<string>("");
const sessionId = ref<string>("");
const isLoading = ref<boolean>(false);

const cashSessionStore = useCashSessionStore();
const userStore = useUserStore();

async function createSession() {
  if (!username.value || !sessionName.value) {
    return;
  }

  isLoading.value = true;

  const createSessionResult = await cashSessionStore.create(sessionName.value);
  const createUserResult = await userStore.create(username.value, createSessionResult.id);

  isLoading.value = false;
  localStorage.setItem(createSessionResult.id, createUserResult.id);
  router.push({ name: "session", params: { id: createSessionResult.id } });
}

async function joinSession() {
  if (!username.value || !sessionId.value) {
    return;
  }

  isLoading.value = true;
  const availableUser = await userStore.findUserInSession(username.value, sessionId.value);
  let userId = availableUser?.id;
  if (!userId) {
    const createUserResult = await userStore.create(username.value, sessionId.value);
    userId = createUserResult.id;
  }
  isLoading.value = false;
  localStorage.setItem(sessionId.value, userId);
  router.go(0);
}

onMounted(async () => {
  const route = useRoute();
  sessionId.value = route.params.id as string;
  const userId = localStorage.getItem(sessionId.value);

  // in case of miss navigation
  if (userId) {
    router.push({ name: "session", params: { id: sessionId.value } });
    return;
  }
});
</script>
