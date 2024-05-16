import { Router } from "express";
import { addFood } from "../../controllers/seller/app.controller";
import { sellerChecker } from "../../middlewares/seller.role";
import { verifyUser } from "../../middlewares/jwt.auth";
export const sellerRouter = Router();

sellerRouter.post("/add", verifyUser, sellerChecker, addFood);
