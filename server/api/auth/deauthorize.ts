import { defineEventHandler, getCookie, deleteCookie, createError } from "h3";
import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const accessToken = getCookie(event, "access_token");

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: No access token found",
    });
  }

  try {
    await $fetch("https://oauth.sandbox.trainingpeaks.com/oauth/deauthorize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Clear cookies
    deleteCookie(event, "access_token");
    deleteCookie(event, "refresh_token");

    return { success: true, message: "Successfully deauthorized" };
  } catch (error) {
    console.error("Error deauthorizing:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to deauthorize",
    });
  }
});
