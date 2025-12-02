import { z, ZodType } from "zod";

export class UserValidation {
  static readonly CREATE: ZodType = z.object({
    username: z.string().min(1, "Username cannot be empty"),
    phone: z.string().min(1, "Phone cannot be empty"),
  });

  static readonly UPDATE: ZodType = z.object({
    username: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
  });
}
