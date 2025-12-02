import { prismaClient } from "../utils/database-util";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validations/validation";
import { RestaurantValidation } from "../validations/restaurant-validation";
import { RestaurantStatus } from "../../generated/prisma/client";
import { RestaurantRequest } from "../models/restaurant-request-model";
import { Restaurant } from "../models/restaurant-model";

export class RestaurantService {
    
    static async create(request: Restaurant) {
        const validatedData = Validation.validate(
            RestaurantValidation.CREATE,
            request
        );

        return await prismaClient.restaurant.create({
            data: validatedData
        });
    }

    static async list(filters: { status?: RestaurantStatus }) {
        return await prismaClient.restaurant.findMany({
            where: filters
        });
    }
    static async get(id: number, request: RestaurantRequest) {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id }
        });
        
        if(!restaurant) throw new ResponseError(404, "Restaurant not found");
        return restaurant;
    }
    
    static async update(id: number, request: RestaurantRequest) {
        const validatedData = Validation.validate(
            RestaurantValidation.UPDATE,
            request
        );

        const check = await prismaClient.restaurant.findUnique({ where: { id }});
        if(!check) throw new ResponseError(404, "Restaurant not found");

        return await prismaClient.restaurant.update({
            where: { id },
            data: validatedData
        });
    }

    static async delete(id: number) {
        const check = await prismaClient.restaurant.findUnique({ where: { id }});
        if(!check) throw new ResponseError(404, "Restaurant not found");

        await prismaClient.restaurant.delete({ where: { id }});
        return "Restaurant deleted";
    }
}