import { z } from "zod";

export const AddCartDto = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive().default(1),
});
export type AddCartDto = z.infer<typeof AddCartDto>;

export const UpdateCartDto = z.object({
  quantity: z.number().int().positive(),
});
