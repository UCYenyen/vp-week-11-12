import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  const customer = await prisma.customer.createMany({
    data: [
      {
        name: "Bryan",
        phone: "1234567890",
      },
      {
        name: "Tezies",
        phone: "0987654321",
      },
      {
        name: "Tunashawarma",
        phone: "5555555555",
      },
    ],
  });

  const restaurant = await prisma.restaurant.createMany({
    data: [
      {
        name: "Bryan's Burgers",
        description: "1112223333",
      },
      {
        name: "Tezies Tacos",
        description: "4445556666",
      },
      {
        name: "Tunashawarma Grill",
        description: "7778889999",
      },
    ],
  });

  const orders = await prisma.order.createMany({
    data: [
      {
        customerId: 1,
        restaurantId: 1,
        itemCount: 25,
      },
      {
        customerId: 2,
        restaurantId: 2,
        itemCount: 15,
      },
      {
        customerId: 3,
        restaurantId: 3,
        itemCount: 30,
      },
      {
        customerId: 2,
        restaurantId: 3,
        itemCount: 5,
      },
      {
        customerId: 1,
        restaurantId: 3,
        itemCount: 5,
      },
    ],
  }); 

  console.log("Seed completed:", { 
    customer: customer,
    restaurant: restaurant,
    orders: orders,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
