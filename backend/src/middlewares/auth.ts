import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  // Read token from cookie
  const token = req.cookies.token;

  // If no token, unauthorized
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token!" });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    // attach userId to request
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token!" });
  }
};
