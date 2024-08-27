<template>
  <div>
    <h1>Athlete Profile</h1>
    <div v-if="loading">Loading profile data...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="profile">
      <p><strong>First Name:</strong> {{ profile.FirstName }}</p>
      <p><strong>Last Name:</strong> {{ profile.LastName }}</p>
      <p><strong>Email:</strong> {{ profile.Email }}</p>
      <p><strong>Gender:</strong> {{ profile.Gender }}</p>
      <p><strong>Birth Date:</strong> {{ profile.BirthDate }}</p>
      <p><strong>Weight:</strong> {{ profile.Weight }} {{ profile.WeightUnit }}</p>
      <p><strong>Height:</strong> {{ profile.Height }} {{ profile.HeightUnit }}</p>
      <p><strong>Country:</strong> {{ profile.Country }}</p>
      <p><strong>State:</strong> {{ profile.State }}</p>
      <p><strong>City:</strong> {{ profile.City }}</p>
      <!-- Add more fields as needed -->
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

onMounted(fetchProfile);
</script>
