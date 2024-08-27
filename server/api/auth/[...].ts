import { createRouter, defineEventHandler, useBase } from "h3";
import initiate from "./initiate";
import callback from "./callback";

const router = createRouter();

router.get("/initiate", defineEventHandler(initiate));
router.get("/callback", defineEventHandler(callback));

export default useBase("/api/auth", router.handler);
