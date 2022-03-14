-- CreateTable
CREATE TABLE "Unsubscribe" (
    "cod" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Unsubscribe_pkey" PRIMARY KEY ("cod")
);
