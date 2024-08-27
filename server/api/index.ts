import { createRouter, useBase } from "h3";

const router = createRouter();

// Import your API route handlers
import authCallback from "./auth/callback";
import authInitiate from "./auth/initiate";
import athleteProfile from "./athlete/profile";

// Define your routes
router.get("/auth/callback", authCallback);
router.get("/auth/initiate", authInitiate);
router.get("/athlete/profile", athleteProfile);

export default useBase("/api", router.handler);
