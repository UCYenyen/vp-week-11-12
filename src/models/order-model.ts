import { Order } from "../../generated/prisma"
import { Customer } from "../models/customer-model";
import { Restaurant } from "../models/restaurant-model";

export type OrderWithRelations = Order & {
    customer?: Customer;
    restaurant?: Restaurant;
};

export interface OrderResponse {
    id: number; 
    itemsAmount: number;
    orderTime: string;
    estimatedArrivalTime: number;
    customerId: number; 
    restaurantId: number; 
    customerName?: string;
    restaurantName?: string;
}

export interface OrderCreateRequest {
    customerId: number; 
    restaurantId: number; 
    itemsAmount: number;
}

export function toOrderResponse(order: OrderWithRelations): OrderResponse {
    return {
        id: order.id,
        itemsAmount: order.itemCount,
        orderTime: order.orderedAt.toISOString(),
        estimatedArrivalTime: (order.itemCount * 10) + 10,
        customerId: order.customerId,
        restaurantId: order.restaurantId,
        customerName: order.customer?.name,
        restaurantName: order.restaurant?.name,
    };
}

export function toOrderResponseList(orders: OrderWithRelations[]): OrderResponse[] {
    return orders.map((order) => toOrderResponse(order));
}