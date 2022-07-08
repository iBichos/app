/*
  Warnings:

  - A unique constraint covering the columns `[merchantId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoriesId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[animalTypesId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animalTypesId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriesId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "animalTypesId" INTEGER NOT NULL,
ADD COLUMN     "categoriesId" INTEGER NOT NULL,
ADD COLUMN     "merchantId" INTEGER NOT NULL,
ADD COLUMN     "orderId" INTEGER;

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "AnimalTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "total_price_cents" INTEGER NOT NULL,
    "status" TEXT,
    "created_at" TEXT,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "cnpj" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "companyName" TEXT,
    "ownerName" TEXT,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "cpf" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "date" TEXT,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerProduct" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CustomerProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_customerId_key" ON "Order"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_customerId_key" ON "Comment"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_productId_key" ON "Comment"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProduct_customerId_key" ON "CustomerProduct"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProduct_productId_key" ON "CustomerProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_merchantId_key" ON "Product"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_categoriesId_key" ON "Product"("categoriesId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_animalTypesId_key" ON "Product"("animalTypesId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_animalTypesId_fkey" FOREIGN KEY ("animalTypesId") REFERENCES "AnimalTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProduct" ADD CONSTRAINT "CustomerProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProduct" ADD CONSTRAINT "CustomerProduct_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
