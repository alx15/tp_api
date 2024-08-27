import { defineEventHandler, getCookie } from "h3";

export default defineEventHandler((event) => {
  const accessToken = getCookie(event, "access_token");
  return !!accessToken;
});
