import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { foodSchema } from "../../zod/food.schema";

const prisma = new PrismaClient();

export const addFood = async (req: Request, res: Response) => {
  try {
    const cookedById = res.locals.user.id;
    const { name, description, price } = req.body;

    const newItem = await prisma.item.create({
      data: { name, description, price, cookedById },
    });
    return res
      .status(200)
      .json({ msg: "Item added successfully", itemId: newItem.id });
  } catch (error) {
    console.error("Error adding food item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
