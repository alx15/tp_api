import { defineEventHandler, getQuery, sendRedirect, createError } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const scopes = (query.scopes as string) || "athlete:profile workouts:read";

  if (!scopes) {
    throw createError({
      statusCode: 400,
      statusMessage: "Scopes are required",
    });
  }

  const authorizationUrl = new URL("https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize");
  authorizationUrl.searchParams.append("response_type", "code");
  authorizationUrl.searchParams.append("client_id", config.public.clientId);
  authorizationUrl.searchParams.append("scope", scopes);
  authorizationUrl.searchParams.append("redirect_uri", `${config.public.appUrl}/api/auth/callback`);

  return sendRedirect(event, authorizationUrl.toString());
});
