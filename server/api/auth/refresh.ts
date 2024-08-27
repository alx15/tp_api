import { defineEventHandler, getCookie, setCookie, createError } from "h3";
import { $fetch } from 'ofetch';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const refreshToken = getCookie(event, "refresh_token");

  if (!refreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "No refresh token found",
    });
  }

  try {
    const tokenResponse = await $fetch("https://oauth.sandbox.trainingpeaks.com/oauth/token", {
      method: 'POST',
      body: new URLSearchParams({
        client_id: config.public.clientId,
        client_secret: config.clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Set new cookies with the refreshed tokens
    setCookie(event, "access_token", tokenResponse.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenResponse.expires_in,
      path: "/",
    });

    if (tokenResponse.refresh_token) {
      setCookie(event, "refresh_token", tokenResponse.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to refresh token",
    });
  }
});
