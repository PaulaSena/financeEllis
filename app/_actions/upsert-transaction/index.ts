"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

import {
  TransactionCategories,
  TransactionPaymentMethod,
  TransactionRecurrenceType,
  TransactionType,
} from "@prisma/client";

import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  categories: TransactionCategories;
  isRecurring?: boolean;
  recurrenceType: TransactionRecurrenceType;
  installments: number;
  paymentMethod: TransactionPaymentMethod;
  description: string;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.transaction.upsert({
    create: { ...params, userId },
    update: { ...params, userId },

    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/transactions");
};
