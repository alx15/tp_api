<template>
  <div>
    <h2>Login with TrainingPeaks</h2>
    <div v-if="!isLoggedIn">
      <div>
        <h3>Select Scopes:</h3>
        <div v-for="scope in availableScopes" :key="scope">
          <input type="checkbox" :id="scope" v-model="selectedScopes" :value="scope" />
          <label :for="scope">{{ scope }}</label>
        </div>
      </div>
      <button @click="initiateOAuth">Login</button>
    </div>
    <div v-else>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const config = useRuntimeConfig();
const router = useRouter();
const isLoggedIn = ref(false);

const availableScopes = ["athlete:profile", "workouts:read", "workouts:write", "coach:athletes"];

const selectedScopes = ref<string[]>(["athlete:profile", "workouts:read"]); // Default scopes

const initiateOAuth = () => {
  const scopes = selectedScopes.value.join(" ");
  const authUrl = `/api/auth/initiate?scopes=${encodeURIComponent(scopes)}`;
  window.location.href = authUrl;
};

const logout = async () => {
  try {
    await $fetch("/api/auth/logout", { method: "POST" });
    isLoggedIn.value = false;
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

onMounted(async () => {
  const { data: authStatus } = await useFetch("/api/auth/check");
  isLoggedIn.value = authStatus.value === true;
});
</script>
