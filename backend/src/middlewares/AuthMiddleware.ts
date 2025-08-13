import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthUser } from "../types/custom-types";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ status: 401, message: "UnAuthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).json({ status: 401, message: "UnAuthorized" });
      return;
    }

    req.user = user as AuthUser;
    next();
  });
};

export default authMiddleware;
