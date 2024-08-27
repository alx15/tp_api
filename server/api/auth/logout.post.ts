import { defineEventHandler, deleteCookie } from "h3";

export default defineEventHandler((event) => {
  deleteCookie(event, "access_token");
  deleteCookie(event, "refresh_token");
  deleteCookie(event, "athlete_id");
  return { success: true };
});
