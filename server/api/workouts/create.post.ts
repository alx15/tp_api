import { defineEventHandler, readBody, getCookie, createError } from "h3";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, "access_token");
  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: No access token found",
    });
  }

  const body = await readBody(event);
  const { startDate, endDate } = body;

  try {
    const response = await axios.post(
      "https://api.sandbox.trainingpeaks.com/v2/workouts/plan",
      {
        AthleteId: null, // The API will use the authenticated athlete's ID
        Title: "Strength Workout Plan",
        WorkoutDay: startDate,
        TotalTimePlanned: "1.0",
        WorkoutType: "strength",
        Structure: JSON.parse(JSON.stringify(require("../../../public/workout-template.json").Structure)),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating workout:", error.response?.data || error.message);
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: `Failed to create workout: ${error.response?.data?.message || error.message}`,
    });
  }
});
