-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "best" SET DATA TYPE TEXT,
ALTER COLUMN "weight" SET DATA TYPE TEXT,
ALTER COLUMN "none" SET DATA TYPE TEXT,
ALTER COLUMN "drip" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Filter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "filterId" INTEGER NOT NULL,

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Filter" ADD CONSTRAINT "Filter_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
