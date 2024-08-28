<template>
  <div class="container">
    <h1 class="title">Athlete Profile</h1>
    <div v-if="loading" class="loading">Loading profile data...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <div v-else-if="profile" class="profile-card">
      <div class="profile-header">
        <h2>{{ profile.FirstName }} {{ profile.LastName }}</h2>
        <p class="email">{{ profile.Email }}</p>
      </div>
      <div class="profile-details">
        <div class="detail-item"><strong>Gender:</strong> {{ profile.Gender || "N/A" }}</div>
        <div class="detail-item"><strong>Birth Date:</strong> {{ formatDate(profile.BirthDate) || "N/A" }}</div>
        <div class="detail-item"><strong>Weight:</strong> {{ profile.Weight || "N/A" }} {{ profile.WeightUnit }}</div>
        <div class="detail-item"><strong>Height:</strong> {{ profile.Height || "N/A" }} {{ profile.HeightUnit }}</div>
        <div class="detail-item"><strong>Location:</strong> {{ formatLocation(profile) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const profile = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchProfile = async () => {
  try {
    const response = await fetch("/api/athlete/profile");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    profile.value = data;
    console.log("Profile data:", data); // For debugging
  } catch (e) {
    error.value = e.message;
    console.error("Error fetching profile:", e);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const formatLocation = (profile) => {
  const parts = [profile.City, profile.State, profile.Country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "N/A";
};

onMounted(fetchProfile);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.loading,
.error {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.error {
  color: #ff4444;
}

.profile-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.profile-header h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.email {
  color: #666;
  margin-top: 5px;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.detail-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.detail-item strong {
  color: #555;
  display: block;
  margin-bottom: 5px;
}
</style>
