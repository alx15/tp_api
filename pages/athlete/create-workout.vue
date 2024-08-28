<template>
  <div class="create-workout-page">
    <h2>Create Workout</h2>
    <CreateWorkout />
  </div>
</template>

<script setup lang="ts">
import CreateWorkout from "~/components/CreateWorkout.vue";
</script>

<style scoped>
.create-workout-page {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
