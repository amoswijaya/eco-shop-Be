import { Request, Response } from "express";
import { RegisterDto, LoginDto } from "./dto";
import { register, login } from "./service";

export const handleRegister = async (req: Request, res: Response) => {
  try {
    console.log("Register request body:", req.body);
    const dto = RegisterDto.parse(req.body);
    const user = await register(dto);
    res.status(201).json({ data: user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const dto = LoginDto.parse(req.body);
    const result = await login(dto);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
