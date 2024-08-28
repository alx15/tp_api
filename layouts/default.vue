<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <h1>Pro Cycling Strength</h1>
        <nav>
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/athlete" class="nav-link">Dashboard</NuxtLink>
          <button v-if="isAuthenticated" @click="logout" class="logout-button">Logout</button>
        </nav>
      </div>
    </header>
    <main class="app-main">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = ref(false);

const checkAuth = async () => {
  try {
    const { data } = await useFetch("/api/auth/check");
    isAuthenticated.value = data.value === true;
  } catch (error) {
    console.error("Error checking authentication:", error);
    isAuthenticated.value = false;
  }
};

const logout = async () => {
  try {
    await $fetch("/api/auth/logout", { method: "POST" });
    isAuthenticated.value = false;
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

onMounted(async () => {
  await checkAuth();
});
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 8px 8px 0 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 24px;
}

nav {
  display: flex;
  gap: 10px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c0392b;
}

.app-main {
  background-color: white;
  padding: 20px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
