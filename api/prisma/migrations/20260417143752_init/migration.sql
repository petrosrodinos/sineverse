/*
  Warnings:

  - You are about to drop the column `credit_purchase_uuid` on the `credit_ledger_entries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "credit_ledger_entries" DROP CONSTRAINT "credit_ledger_entries_credit_purchase_uuid_fkey";

-- DropIndex
DROP INDEX "credit_ledger_entries_credit_purchase_uuid_idx";

-- AlterTable
ALTER TABLE "credit_ledger_entries" DROP COLUMN "credit_purchase_uuid";
