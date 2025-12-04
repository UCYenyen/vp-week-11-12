import { prismaClient } from "../utils/database-util";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validations/validation";
import { OrderValidation } from "../validations/order-validation";
import { OrderRequest } from "../models/order-request";

export class OrderService {
    
    static async create(userId: number, request: OrderRequest) {
        const validatedData = Validation.validate(
            OrderValidation.CREATE,
            request.body
        );

        const customer = await prismaClient.customer.findUnique({
            where: { id: userId }
        });

        if (!customer) throw new ResponseError(404, "Customer not found");
        
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id: validatedData.restaurantId }
        });

        if (!restaurant) throw new ResponseError(404, "Restaurant not found");
        
        if (restaurant.status === 'CLOSED') throw new ResponseError(400, "Restaurant is closed");

        return await prismaClient.order.create({
            data: {
                customerId: userId,
                restaurantId: validatedData.restaurantId,
                itemCount: validatedData.itemCount,
                status: 'PENDING'
            }
        });
    }

    static async list(filter: { customerId?: number, restaurantId?: number }) {
        const orders = await prismaClient.order.findMany({
            where: filter,
            include: {
                restaurant: true,
                customer: true
            }
        });

        return orders.map((order: { itemCount: number; }) => ({
            ...order,
            estimatedArrivalMinutes: (order.itemCount * 10) + 10
        }));
    }
    
    static async get(id: number, request: OrderRequest) {
        const order = await prismaClient.order.findUnique({
            where: { id },
            include: {
                restaurant: true,
                customer: true
            }
        });
        
        if(!order) throw new ResponseError(404, "Order not found");
        return order;
    }
    static async delete(id: number) {
        const check = await prismaClient.order.findUnique({ where: { id }});
        if(!check) throw new ResponseError(404, "Order not found");

        await prismaClient.order.delete({ where: { id }});
        return "Order deleted";
    }   
}