-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "price_cents" INTEGER NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "merchantId" INTEGER NOT NULL,
    "categoriesId" INTEGER NOT NULL,
    "animalTypesId" INTEGER NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "total_price_cents" INTEGER NOT NULL,
    "status" TEXT,
    "created_at" TEXT,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchants" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "cnpj" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "companyName" TEXT,
    "ownerName" TEXT,

    CONSTRAINT "Merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "cpf" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "date" TEXT,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerProducts" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CustomerProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_merchantId_key" ON "Products"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "Products_categoriesId_key" ON "Products"("categoriesId");

-- CreateIndex
CREATE UNIQUE INDEX "Products_animalTypesId_key" ON "Products"("animalTypesId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_customerId_key" ON "Orders"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_username_key" ON "Customers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_customerId_key" ON "Comments"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_productId_key" ON "Comments"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProducts_customerId_key" ON "CustomerProducts"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProducts_productId_key" ON "CustomerProducts"("productId");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_animalTypesId_fkey" FOREIGN KEY ("animalTypesId") REFERENCES "AnimalTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProducts" ADD CONSTRAINT "CustomerProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProducts" ADD CONSTRAINT "CustomerProducts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
