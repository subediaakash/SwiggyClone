import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const buyerChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail = res.locals.user.email;

  const buyer = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  if (!buyer) {
    return res.status(400).json("Not enough Permissions");
  }

  next();
};
