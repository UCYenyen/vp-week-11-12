import { Request } from "express";

export interface OrderRequest extends Request {
  id: number;
  orderedAt: string;
  status: string;
  restaurantId: number;
  customerId: number;
  itemCount: number;
}
