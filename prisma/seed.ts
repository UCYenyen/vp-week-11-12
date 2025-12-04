import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  const customer = await prisma.customer.createMany({
    data: [
      {
        name: "Bryan chef",
        phone: "6283233837164",
      },
      {
        name: "Tezies chef",
        phone: "6282231837162",
      },
      {
        name: "Tuna chef",
        phone: "+6281231847161",
      },
    ],
  });

  const restaurant = await prisma.restaurant.createMany({
    data: [
      {
        name: "Kazuto's Burgers",
        description: "1112223333",
      },
      {
        name: "Saizo Tacos",
        description: "4445556666",
      },
      {
        name: "Tuni Grill",
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
