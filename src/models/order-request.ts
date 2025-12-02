import { Request } from "express";

export interface OrdertRequest extends Request {
  order?: {
    id: number;
    orderedAt: string;
    status: string;
    restaurantId: number;
    customerId: number;
    itemCount: number;
  };
}
