import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { userSchema } from "../../zod/auth.zod";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  const type = req.params.type;
  const inputBody = req.body;

  const parsedInput = userSchema.safeParse(inputBody);
  if (!parsedInput.success) {
    return res
      .status(400)
      .json({ msg: "zod validation failed", err: parsedInput.error.message });
  }

  const { email, name, password } = inputBody;

  try {
    let newUser;
    if (type.toUpperCase() === "COOK") {
      newUser = await prisma.cook.create({
        data: {
          email,
          name,
          password,
        },
      });
    } else {
      newUser = await prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });
    }

    const token = jwt.sign(
      {
        email: email,
        id: newUser.id,
      },
      process.env.JWT_SECRET!
    );

    return res.status(201).json({ token: token, userName: name });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json("Error creating user");
  }
};
