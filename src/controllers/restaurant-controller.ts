import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "../services/restaurant-service";

export class RestaurantController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await RestaurantService.create(req.body);
            res.status(200).json({ data: response });
        } catch (e) { next(e); }
    }

    static async get(req: Request, res: Response, next: NextFunction){
        try{
            const id = parseInt(req.params.id);
            const response = await RestaurantService.get(id, req.body);
            res.status(200).json({ data: response });
        }catch(e) {
            next(e);
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const status = req.query.status as any;
            const response = await RestaurantService.list({ status });
            res.status(200).json({ data: response });
        } catch (e) { next(e); }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const response = await RestaurantService.update(id, req.body);
            res.status(200).json({ data: response });
        } catch (e) { next(e); }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await RestaurantService.delete(id);
            res.status(200).json({ data: "OK" });
        } catch (e) { next(e); }
    }
}