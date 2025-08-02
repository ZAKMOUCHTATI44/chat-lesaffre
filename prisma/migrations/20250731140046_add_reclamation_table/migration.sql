-- CreateTable
CREATE TABLE "reclamations" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "statut" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reclamations_pkey" PRIMARY KEY ("id")
);
