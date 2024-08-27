<template>
  <div class="athlete-dashboard">
    <header>
      <h1>Athlete Dashboard</h1>
      <p v-if="athleteId">Athlete ID: {{ athleteId }}</p>
    </header>
    <nav>
      <NuxtLink to="/athlete/profile" class="nav-link">Profile</NuxtLink>
      <NuxtLink to="/athlete/activities" class="nav-link">Activities</NuxtLink>
      <NuxtLink to="/athlete/stats" class="nav-link">Stats</NuxtLink>
    </nav>
    <main>
      <NuxtPage />
      <CreateWorkout />
    </main>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CreateWorkout from "~/components/CreateWorkout.vue";
import { useErrorHandler } from "~/composables/useErrorHandler";

const router = useRouter();
const athleteId = ref(null);
const { error, handleError } = useErrorHandler();

onMounted(async () => {
  try {
    const { data: isAuthenticated } = await useFetch("/api/auth/check");
    if (!isAuthenticated) {
      router.push("/");
    } else {
      const { data: id } = await useFetch("/api/athlete/id");
      athleteId.value = id;
    }
  } catch (e) {
    handleError(e);
  }
});
</script>

<style scoped>
.athlete-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 8px 8px 0 0;
}

h1 {
  margin: 0;
  font-size: 24px;
}

nav {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 0 0 8px 8px;
  margin-bottom: 20px;
}

.nav-link {
  color: #3498db;
  text-decoration: none;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #e9ecef;
}

main {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
