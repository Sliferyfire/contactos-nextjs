-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Contactos" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT,
    "correo" TEXT,
    "telefono" TEXT,
    "estado" TEXT,

    CONSTRAINT "CONTACTOS_pkey" PRIMARY KEY ("id")
);

