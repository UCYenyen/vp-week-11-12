import { Request } from "express";

export interface RestaurantRequest extends Request {
  body: {
    name: string;
    description: string;
    status?: string;
  };
}
