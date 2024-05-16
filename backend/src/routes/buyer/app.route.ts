import { Router } from "express";
import { addItem, deleteItem } from "../../controllers/buyer/app.controller";
import { verifyUser } from "../../middlewares/jwt.auth";
import { buyerChecker } from "../../middlewares/buyer.role";

export const buyerRouter = Router();

buyerRouter.post("/add", verifyUser, buyerChecker, addItem);
buyerRouter.delete("/cancel/:orderId", verifyUser, buyerChecker, deleteItem);
