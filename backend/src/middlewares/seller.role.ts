import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const sellerChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail = res.locals.user.email;

  const seller = await prisma.cook.findUnique({
    where: {
      email: userEmail,
    },
  });
  if (!seller) {
    return res.status(400).json("Not enough Permissions");
  }

  next();
};
