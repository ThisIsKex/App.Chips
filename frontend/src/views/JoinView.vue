<template>
  <div>
    <loading-overlay :show="isLoading" />
    <v-container fluid class="hero-container">
      <!-- Hero Section -->
      <v-row justify="center" class="hero-section">
      <v-col cols="12" md="8" lg="6" class="text-center">
        <div class="hero-content">
          <div class="hero-icon-wrapper">
            <v-icon size="60" color="white" class="hero-icon">mdi-cash-multiple</v-icon>
          </div>
          <div class="hero-text">
            <h1 class="hero-title">Chips</h1>
            <p class="hero-subtitle">Split expenses easily and fairly</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row justify="center" class="content-section">
      <v-col cols="12" sm="10" md="6" lg="5">
        <!-- Join Session Card -->
        <v-card v-if="sessionId" class="action-card" elevation="12">
          <div class="card-icon-bg join-bg">
            <v-icon size="50" color="white">mdi-account-multiple-plus</v-icon>
          </div>
          <v-card-title class="card-title">
            <v-icon class="mr-2" color="primary">mdi-login</v-icon>
            Join Session
          </v-card-title>
          <v-card-text class="card-content">
            <p class="session-info">Session ID: <strong>{{ sessionId }}</strong></p>
            <v-text-field label="Your Name" v-model="username" variant="outlined" density="comfortable"
              prepend-inner-icon="mdi-account" color="primary" class="mt-4" />
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn @click="joinSession" color="primary" size="large" block :disabled="!username" class="action-btn">
              <v-icon left>mdi-login</v-icon>
              Join
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Create Session Card -->
        <v-card v-else class="action-card" elevation="12">
          <div class="card-icon-bg create-bg">
            <v-icon size="50" color="white">mdi-plus-circle</v-icon>
          </div>
          <v-card-title class="card-title">
            <v-icon class="mr-2" color="primary">mdi-rocket-launch</v-icon>
            Start New Session
          </v-card-title>
          <v-card-text class="card-content">
            <v-text-field label="Session Name" v-model="sessionName" variant="outlined" density="comfortable"
              prepend-inner-icon="mdi-tag" color="primary" placeholder="e.g. Barcelona Trip 2026" class="mb-3" />
            <v-text-field label="Your Name" v-model="username" variant="outlined" density="comfortable"
              prepend-inner-icon="mdi-account" color="primary" placeholder="What's your name?" />
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn @click="createSession" color="primary" size="large" block :disabled="!username || !sessionName"
              class="action-btn">
              <v-icon left>mdi-plus-circle</v-icon>
              Create Session
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Features Section -->
        <v-row class="features-section mt-8">
          <v-col cols="12" sm="4" v-for="feature in features" :key="feature.title" class="text-center">
            <div class="feature-item">
              <v-icon :color="feature.color" size="40" class="feature-icon">{{ feature.icon }}</v-icon>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-text">{{ feature.text }}</p>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>
<script setup lang="ts">
import LoadingOverlay from "../components/LoadingOverlay.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import { useCashSessionStore } from "../stores/CashSessionStore";

const username = ref<string>("");
const sessionName = ref<string>("");
const sessionId = ref<string>("");
const isLoading = ref<boolean>(false);

const cashSessionStore = useCashSessionStore();

const features = [
  {
    icon: 'mdi-account-group',
    title: 'Together',
    text: 'Share expenses in real-time with friends',
    color: 'primary'
  },
  {
    icon: 'mdi-calculator',
    title: 'Fair',
    text: 'Automatic calculation of all debts',
    color: 'success'
  },
  {
    icon: 'mdi-lightning-bolt',
    title: 'Fast',
    text: 'No registration required, just start',
    color: 'warning'
  }
];

async function createSession() {
  if (!username.value || !sessionName.value) {
    return;
  }

  isLoading.value = true;
  const createSessionResult = await cashSessionStore.create({ name: sessionName.value, users: [username.value] });
  localStorage.setItem(createSessionResult.id, createSessionResult.users[0]!.id);
  isLoading.value = false;

  router.push({ name: "session", params: { id: createSessionResult.id } });
}

async function joinSession() {
  if (!username.value || !sessionId.value) {
    return;
  }

  isLoading.value = true;
  const joinResult = await cashSessionStore.joinSession(sessionId.value, { userName: username.value });
  const currentUser = joinResult?.users.find((x) => x.name === username.value)!;
  localStorage.setItem(sessionId.value, currentUser.id);
  isLoading.value = false;

  router.push({ name: "session", params: { id: sessionId.value } });
}

onMounted(async () => {
  const route = useRoute();
  sessionId.value = route.params.id as string;

  // Only check localStorage if we have a sessionId
  if (sessionId.value) {
    const userId = localStorage.getItem(sessionId.value);
    // in case of miss navigation
    if (userId) {
      router.push({ name: "session", params: { id: sessionId.value } });
      return;
    }
  }
});
</script>

<style scoped>
.hero-container {
  min-height: auto;
  padding: 2rem 1rem;
  max-width: 100%;
}

.hero-section {
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s ease-out;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hero-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 50%;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  animation: float 3s ease-in-out infinite;
  flex-shrink: 0;
}

.hero-icon {
  animation: pulse 2s ease-in-out infinite;
}

.hero-text {
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
  letter-spacing: -2px;
  line-height: 1;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-weight: 300;
  margin: 0;
}

.content-section {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.action-card {
  border-radius: 24px !important;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.98) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding-bottom: 8px;
}

.action-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
}

.card-icon-bg {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.1;
}

.join-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.create-bg {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.card-title {
  font-size: 1.75rem !important;
  font-weight: 700;
  padding: 2rem 2rem 1rem 2rem !important;
  color: #2c3e50;
}

.card-content {
  padding: 0 2rem 1.5rem 2rem !important;
}

.session-info {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0;
}

.card-actions {
  padding: 0 2rem 2rem 2rem !important;
}

.action-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  font-size: 1.1rem;
  padding: 24px !important;
  border-radius: 12px !important;
}

.features-section {
  margin-top: 3rem;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out 0.6s both;
}

.feature-item {
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  margin-bottom: 1rem;
  animation: fadeIn 1s ease-out;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.feature-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.4;
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

/* Responsive Design */
@media (max-width: 600px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-text {
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-icon-wrapper {
    padding: 15px;
  }

  .card-title {
    font-size: 1.5rem !important;
  }

  .features-section {
    margin-top: 2rem;
  }
}
</style>
