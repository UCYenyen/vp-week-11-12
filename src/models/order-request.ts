import { Request } from "express";

export interface OrderRequest extends Request {
    body: {
        customerId: number;
        restaurantId: number;
        itemCount: number;
        status?: string;
    }
}