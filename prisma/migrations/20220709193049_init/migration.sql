/*
  Warnings:

  - You are about to drop the column `merchantsId` on the `OrderProducts` table. All the data in the column will be lost.
  - You are about to drop the column `merchant_id` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_merchantsId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_merchant_id_fkey";

-- AlterTable
ALTER TABLE "OrderProducts" DROP COLUMN "merchantsId";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "merchant_id",
ALTER COLUMN "total_price_cents" DROP NOT NULL;
