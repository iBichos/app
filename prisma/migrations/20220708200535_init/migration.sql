/*
  Warnings:

  - You are about to drop the column `customerId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `CustomerProducts` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `CustomerProducts` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `animalTypesId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `categoriesId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customer_id]` on the table `CustomerProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `CustomerProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customer_id]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[merchant_id]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[merchant_id]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categories_id]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[animalTypes_id]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `CustomerProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `CustomerProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchant_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchant_id` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_productId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerProducts" DROP CONSTRAINT "CustomerProducts_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerProducts" DROP CONSTRAINT "CustomerProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_animalTypesId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_orderId_fkey";

-- DropIndex
DROP INDEX "Comments_customerId_key";

-- DropIndex
DROP INDEX "Comments_productId_key";

-- DropIndex
DROP INDEX "CustomerProducts_customerId_key";

-- DropIndex
DROP INDEX "CustomerProducts_productId_key";

-- DropIndex
DROP INDEX "Orders_customerId_key";

-- DropIndex
DROP INDEX "Products_animalTypesId_key";

-- DropIndex
DROP INDEX "Products_categoriesId_key";

-- DropIndex
DROP INDEX "Products_merchantId_key";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "customerId",
DROP COLUMN "productId",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CustomerProducts" DROP COLUMN "customerId",
DROP COLUMN "productId",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "customerId",
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "merchant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "animalTypesId",
DROP COLUMN "categoriesId",
DROP COLUMN "merchantId",
DROP COLUMN "orderId",
ADD COLUMN     "animalTypes_id" INTEGER,
ADD COLUMN     "categories_id" INTEGER,
ADD COLUMN     "merchant_id" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "price_cents" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OrderProducts" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "merchantsId" INTEGER,

    CONSTRAINT "OrderProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comments_customer_id_key" ON "Comments"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_product_id_key" ON "Comments"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProducts_customer_id_key" ON "CustomerProducts"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProducts_product_id_key" ON "CustomerProducts"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_customer_id_key" ON "Orders"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_merchant_id_key" ON "Orders"("merchant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Products_merchant_id_key" ON "Products"("merchant_id");

-- CreateIndex
CREATE UNIQUE INDEX "Products_categories_id_key" ON "Products"("categories_id");

-- CreateIndex
CREATE UNIQUE INDEX "Products_animalTypes_id_key" ON "Products"("animalTypes_id");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_animalTypes_id_fkey" FOREIGN KEY ("animalTypes_id") REFERENCES "AnimalTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_merchantsId_fkey" FOREIGN KEY ("merchantsId") REFERENCES "Merchants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProducts" ADD CONSTRAINT "CustomerProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProducts" ADD CONSTRAINT "CustomerProducts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
