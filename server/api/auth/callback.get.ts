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
    console.log("Attempting to exchange code for token with the following parameters:");
    console.log("client_id:", config.public.clientId);
    console.log("redirect_uri:", `${config.public.appUrl}/api/auth/callback`);
    console.log("code:", code);

    const tokenUrl = "https://oauth.sandbox.trainingpeaks.com/oauth/token";
    const body = new URLSearchParams({
      client_id: config.public.clientId,
      client_secret: config.clientSecret,
      grant_type: "authorization_code",
      code: code, // Don't decode the code here
      redirect_uri: `${config.public.appUrl}/api/auth/callback`,
      scope: query.scope as string, // Use the scope from the query parameters
    });

    console.log("Token request body:", body.toString());

    const tokenResponse = await $fetch(tokenUrl, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Token exchange successful. Response:", tokenResponse);

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
    console.error("Error details:", error.response?.data);
    console.error("Status:", error.response?.status);
    console.error("Headers:", error.response?.headers);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to exchange authorization code for token: ${error.message}`,
    });
  }
});
