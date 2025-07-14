import { z } from "zod";

export const RegisterDto = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});
export type RegisterDto = z.infer<typeof RegisterDto>;

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginDto = z.infer<typeof LoginDto>;
