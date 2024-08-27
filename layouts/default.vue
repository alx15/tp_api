<template>
  <div>
    <header>
      <!-- Your existing header content -->
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

const { isAuthenticated, checkAuth, logout } = useAuth();

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

.app-main {
  background-color: white;
  padding: 20px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
