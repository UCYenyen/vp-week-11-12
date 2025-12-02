import { z, ZodType } from "zod";

export class OrderValidation {
    static readonly CREATE: ZodType = z.object({
        restaurantId: z.number().int().positive("Restaurant ID must be valid"),
        itemCount: z.number().int().positive("Item count must be at least 1"),
    });
    static readonly UPDATE: ZodType = z.object({
        itemCount: z.number().int().positive("Item count must be at least 1").optional(),
        status: z.enum(['PENDING', 'COMPLETED', 'CANCELED']).optional(),
    });
}