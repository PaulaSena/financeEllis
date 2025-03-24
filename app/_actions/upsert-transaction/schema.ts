import {
  TransactionCategories,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  categories: z.nativeEnum(TransactionCategories),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  description: z.string(),
  date: z.date(),
});
