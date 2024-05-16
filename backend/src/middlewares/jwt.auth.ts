import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(200).json({ message: "Token not found" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    return res.status(200).json({ err: "Provide a valid token" });
  }
};
