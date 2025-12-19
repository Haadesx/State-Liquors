import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().optional(), // Override base price if present
  inventoryCount: z.number().int().nonnegative().optional(),
});

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  subCategory: z.string().optional(),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().optional(),
  size: z.string().optional(), // e.g., "750ml"
  abv: z.number().optional(), // e.g., 40 for 40%
  images: z.array(z.string()),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  inStock: z.boolean().default(true),
  inventoryCount: z.number().int().nonnegative().optional(),
  isAlcohol: z.boolean().default(true),
  variants: z.array(productVariantSchema).default([]),
});

export const cartItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  qty: z.number().int().positive(),
  unitPrice: z.number().nonnegative(), // Snapshot price
  // Optional expanded product data for UI
  product: productSchema.optional(),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  subtotal: z.number().nonnegative(),
  tax: z.number().nonnegative().optional(),
  total: z.number().nonnegative().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
