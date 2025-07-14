import { z } from "zod";
export const AddWishlistDto = z.object({
  productId: z.number().int().positive(),
});
