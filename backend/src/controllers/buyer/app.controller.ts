import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
  } catch (err) {
    return res.status(400).json("Couldnt find the items");
  }
};

export const addItem = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const itemIdsParam = req.query.itemId;

  if (!itemIdsParam) {
    return res.status(400).json({ msg: "No item IDs provided" });
  }

  const itemIds: number[] = itemIdsParam
    .toString()
    .split(",")
    .map((id: string) => parseInt(id.trim()));

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId: userId,
        status: "orderPlaced",
        items: {
          connect: itemIds.map((id: number) => ({ id })),
        },
      },
    });

    return res
      .status(200)
      .json({ msg: "Order successfully placed", order: newOrder });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "Error occurred while placing the order", error: err });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  try {
    const deletedOrder = prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return res
      .status(200)
      .json({ msg: "Order successfully deleted ", deletedOrder: deletedOrder });
  } catch (err) {
    return res.status(400).json("Error occured while deleting the order");
  }
};
