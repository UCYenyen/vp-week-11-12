import { z, ZodType } from "zod";

export class RestaurantValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1, "Restaurant name is required"),
        description: z.string().min(1, "Description is required"),
        status: z.enum(["OPEN", "CLOSED"]).optional().default("CLOSED"),
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        status: z.enum(["OPEN", "CLOSED"]).optional(),
    });
}