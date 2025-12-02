import { Request } from 'express';

export interface CustomerRequest extends Request{
    user?: {
        id: number;
        name: string;
        phone: string;
    };
}