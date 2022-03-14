-- CreateTable
CREATE TABLE "Client" (
    "cod" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sended" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("cod")
);
