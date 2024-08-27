import { defineEventHandler, createError, getCookie } from "h3";
import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, "access_token");

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: No access token found",
    });
  }

  try {
    const profileData = await $fetch("https://api.sandbox.trainingpeaks.com/v1/athlete/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return profileData;
  } catch (error) {
    console.error("Error fetching athlete profile:", error);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch athlete profile: ${error.message}`,
    });
  }
});
