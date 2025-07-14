import { z } from "zod";

export const CreateProductDto = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0).default(0),
  images: z.array(z.string().url()).optional().default([]),
  categoryId: z.number().int().positive(),
});
export type CreateProductDto = z.infer<typeof CreateProductDto>;

export const UpdateProductDto = CreateProductDto.partial();
export type UpdateProductDto = z.infer<typeof UpdateProductDto>;
