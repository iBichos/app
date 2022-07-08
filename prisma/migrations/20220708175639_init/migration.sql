-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "price_cents" INTEGER NOT NULL,
    "description" TEXT,
    "image_url" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
