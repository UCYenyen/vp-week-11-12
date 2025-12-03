import { prismaClient } from "../utils/database-util";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validations/validation";
import { RestaurantValidation } from "../validations/restaurant-validation";
import { RestaurantStatus } from "../../generated/prisma/client";

export class RestaurantService {
    
    static async create(data: { name: string; description: string; status?: string }) {
        const validatedData = Validation.validate(
            RestaurantValidation.CREATE,
            data
        );

        return await prismaClient.restaurant.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                status: validatedData.status as RestaurantStatus
            }
        });
    }

    static async list(filters: { status?: RestaurantStatus }) {
        return await prismaClient.restaurant.findMany({
            where: filters
        });
    }
    
    static async get(id: number) {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id }
        });
        
        if(!restaurant) throw new ResponseError(404, "Restaurant not found");
        return restaurant;
    }
    
    static async update(id: number, data: { name?: string; description?: string; status?: string }) {
        const validatedData = Validation.validate(
            RestaurantValidation.UPDATE,
            data
        );

        const check = await prismaClient.restaurant.findUnique({ where: { id }});
        if(!check) throw new ResponseError(404, "Restaurant not found");

        const updateData: any = {};
        if (validatedData.name !== undefined) updateData.name = validatedData.name;
        if (validatedData.description !== undefined) updateData.description = validatedData.description;
        if (validatedData.status !== undefined) updateData.status = validatedData.status as RestaurantStatus;

        return await prismaClient.restaurant.update({
            where: { id },
            data: updateData
        });
    }

    static async delete(id: number) {
        const check = await prismaClient.restaurant.findUnique({ where: { id }});
        if(!check) throw new ResponseError(404, "Restaurant not found");

        await prismaClient.restaurant.delete({ where: { id }});
        return "Restaurant deleted";
    }
}