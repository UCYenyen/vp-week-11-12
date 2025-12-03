import { Request } from "express";

export interface CustomerRequest extends Request {
  body: {
    id: number;
    name: string;
    phone: string;
  };
}
