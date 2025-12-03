-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_restaurantId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
