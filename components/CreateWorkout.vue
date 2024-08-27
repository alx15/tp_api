<template>
  <div class="create-workout">
    <h2>Create Workout</h2>
    <form @submit.prevent="createWorkout">
      <div>
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="startDate" required />
      </div>
      <div>
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="endDate" required />
      </div>
      <button type="submit">Create Workouts</button>
    </form>
    <div v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const startDate = ref("");
const endDate = ref("");
const message = ref("");
const isSuccess = ref(true);

const createWorkout = async () => {
  try {
    const response = await fetch("/api/workouts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: startDate.value,
        endDate: endDate.value,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.statusMessage || "Failed to create workouts");
    }

    message.value = `Successfully created workout`;
    isSuccess.value = true;
  } catch (error) {
    message.value = error.message;
    isSuccess.value = false;
    console.error("Error creating workouts:", error);
  }
};
</script>

<style scoped>
.create-workout {
  margin-top: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
