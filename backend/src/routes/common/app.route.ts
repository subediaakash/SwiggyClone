import { Router } from "express";
import { signUp } from "../../controllers/common/auth.controller";
export const commonRouter = Router();

commonRouter.post("/signup/:type", signUp);
