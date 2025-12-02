import { string } from "zod"

export interface Order {
    orderedAt: string
    status: string
    restaurantId: number
    customerId: number
    itemCount: number
}