import { defineEventHandler, getCookie } from "h3";

export default defineEventHandler((event) => {
  const athleteId = getCookie(event, "athlete_id");
  console.log("Fetching Athlete ID:", athleteId);
  return athleteId;
});
