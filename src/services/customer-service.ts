import { ResponseError } from "../error/response-error";
import { prismaClient } from "../utils/database-util";
import { UserValidation } from "../validations/customer-validation";
import { Validation } from "../validations/validation";
import { Customer } from "../models/customer-model";
import { CustomerRequest } from "../models/customer-request-model";

export class CustomerService {
  static async create(request: CustomerRequest): Promise<Customer> {
    const validatedData = Validation.validate(
      UserValidation.CREATE,
      request.body
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
        name: validatedData.username,
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

  static async update(id: string, request: any): Promise<Customer> {
    const customerId = parseInt(id);
    if (isNaN(customerId)) {
      throw new ResponseError(400, "Invalid customer ID");
    }

    const validatedData = Validation.validate(UserValidation.UPDATE, request);

    const customerCheck = await prismaClient.customer.findUnique({
      where: { id: customerId },
    });

    if (!customerCheck) throw new ResponseError(404, "Customer not found");

    const data: any = {};
    if (validatedData.username) data.name = validatedData.username;
    if (validatedData.phone) data.phone = validatedData.phone;

    return await prismaClient.customer.update({
      where: { id: customerId },
      data: data,
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
