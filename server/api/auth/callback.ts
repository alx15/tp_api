import { defineEventHandler, getQuery, setCookie, sendRedirect, createError } from "h3";
import { $fetch } from "ofetch";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const code = query.code as string;

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Authorization code is missing",
    });
  }

  try {
    const tokenResponse = await $fetch("https://oauth.sandbox.trainingpeaks.com/oauth/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: config.public.clientId,
        client_secret: config.clientSecret,
        grant_type: "authorization_code",
        code: decodeURIComponent(code), // Make sure to decode the code
        redirect_uri: `${config.public.appUrl}/api/auth/callback`,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Set cookies with the tokens
    setCookie(event, "access_token", tokenResponse.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenResponse.expires_in,
      path: "/",
    });

    setCookie(event, "refresh_token", tokenResponse.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    // Redirect to the athlete page
    return sendRedirect(event, "/athlete");
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to exchange authorization code for token",
    });
  }
});
