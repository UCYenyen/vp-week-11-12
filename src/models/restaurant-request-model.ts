import { Request } from 'express';

export interface RestaurantRequest extends Request{
    restaurant?: {
        id: number;
        name: string;
        description: string;
    };
}