import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const signToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as { id: number; role: string };
