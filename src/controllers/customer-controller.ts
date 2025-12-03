import { Request, Response, NextFunction } from "express"
import { CustomerService } from "../services/customer-service"
import { CustomerRequest } from "../models/customer-request-model"

export class CustomerController {
    static async create(req: CustomerRequest, res: Response, next: NextFunction) {
        try {
            const response = await CustomerService.create(req.body)
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    static async get(req: CustomerRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: "Missing customer id" })
            }
            const response = await CustomerService.get(id)
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    static async list(req: CustomerRequest, res: Response, next: NextFunction) {
        try {
            const response = await CustomerService.list()
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: CustomerRequest, res: Response, next: NextFunction) {
         try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: "Missing customer id" })
            }
            const response = await CustomerService.update(id, req.body)
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

   static async delete(req: CustomerRequest, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "Missing customer id" })
        }
        const response = await CustomerService.delete(id)
        res.status(200).json({ data: response })
    } catch (error) {
        next(error)
    }
}
}