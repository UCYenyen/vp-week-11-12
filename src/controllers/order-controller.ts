import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order-service";
import { OrderRequest } from "../models/order-request";

export class OrderController {
    static async create(req: OrderRequest, res: Response, next: NextFunction) {
        try {
            const customerId = req.body.customerId;
            if (!customerId) {
                return res.status(400).json({ errors: "customerId is required" });
            }
            const response = await OrderService.create(customerId, req);
            res.status(200).json({ data: response });
        } catch (e) { next(e); }
    }

    static async list(req: OrderRequest, res: Response, next: NextFunction) {
        try {
            const restaurantId = req.query.restaurant_id ? parseInt(req.query.restaurant_id as string) : undefined;
            const customerId = req.query.customer_id ? parseInt(req.query.customer_id as string) : undefined;
            
            const response = await OrderService.list({ 
                customerId: customerId,
                restaurantId: restaurantId
            });
            res.status(200).json({ data: response });
        } catch (e) { next(e); }
    }

    static async get(req: OrderRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const response = await OrderService.get(id, req);
            res.status(200).json({ data: response });
        } catch (e) { next(e); }
    }

    static async update(req: OrderRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const response = await OrderService.update(id, req.body);
            res.status(200).json({ data: response });
        } catch (e) { next(e); }
    }

    static async delete(req: OrderRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await OrderService.delete(id);
            res.status(200).json({ data: "OK" });
        } catch (e) { next(e); }
    }
}