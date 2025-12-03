import { ResponseError } from "../error/response-error";
import { prismaClient } from "../utils/database-util";
import { UserValidation } from "../validations/customer-validation";
import { Validation } from "../validations/validation";
import { Customer } from "../models/customer-model";

export class CustomerService {
  static async create(data: { name: string; phone: string }): Promise<Customer> {
    const validatedData = Validation.validate(
      UserValidation.CREATE,
      data
    );

    const phone = await prismaClient.customer.findFirst({
      where: {
        phone: validatedData.phone,
      },
    });

    if (phone) {
      throw new ResponseError(400, "Phone has already existed!");
    }

    return await prismaClient.customer.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
      },
    });
  }

  static async get(id: string): Promise<Customer> {
    const customerId = parseInt(id);
    if (isNaN(customerId)) {
      throw new ResponseError(400, "Invalid customer ID");
    }

    const customer = await prismaClient.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) throw new ResponseError(404, "Customer not found");
    return customer;
  }
  
  static async list(): Promise<Customer[]> {
    return await prismaClient.customer.findMany();
  }

  static async update(id: string, data: { name?: string; phone?: string }): Promise<Customer> {
    const customerId = parseInt(id);
    if (isNaN(customerId)) {
      throw new ResponseError(400, "Invalid customer ID");
    }

    const validatedData = Validation.validate(UserValidation.UPDATE, data);

    const customerCheck = await prismaClient.customer.findUnique({
      where: { id: customerId },
    });

    if (!customerCheck) throw new ResponseError(404, "Customer not found");

    const updateData: any = {};
    if (validatedData.name) updateData.name = validatedData.name;
    if (validatedData.phone) updateData.phone = validatedData.phone;

    return await prismaClient.customer.update({
      where: { id: customerId },
      data: updateData,
    });
  }

  static async delete(id: string): Promise<string> {
    const customerId = parseInt(id);
    if (isNaN(customerId)) {
      throw new ResponseError(400, "Invalid customer ID");
    }

    const customerCheck = await prismaClient.customer.findUnique({
      where: { id: customerId },
    });

    if (!customerCheck) throw new ResponseError(404, "Customer not found");

    await prismaClient.customer.delete({
      where: { id: customerId },
    });

    return "Customer deleted successfully";
  }
}
