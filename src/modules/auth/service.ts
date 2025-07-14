import prisma from "../../lib/prisma";
import { RegisterDto, LoginDto } from "./dto";
import { hashPassword, comparePassword } from "../../lib/hash";
import { signToken } from "../../lib/jwt";

export const register = async (data: RegisterDto) => {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) throw new Error("Email already exists");

  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: { ...data, password: hashed },
  });
  return { id: user.id, email: user.email, name: user.name, role: user.role };
};

export const login = async (data: LoginDto) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(data.password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = signToken({ id: user.id, role: user.role });
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
};
