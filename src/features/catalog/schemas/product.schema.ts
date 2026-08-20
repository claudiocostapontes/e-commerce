import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  stock: z.number(),
  category: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;