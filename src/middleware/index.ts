import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import { Role } from "@prisma/client";

export const roleGuard = (...allowed: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token required" });
  }

  const token = header.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.user = {
      ...payload,
      role: payload.role as Role,
    };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
