-- CreateTable
CREATE TABLE "ClientToken" (
    "token" UUID NOT NULL DEFAULT gen_random_uuid(),
    "client_cod" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientToken_pkey" PRIMARY KEY ("token")
);
