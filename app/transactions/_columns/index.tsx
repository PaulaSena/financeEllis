"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import TransactionTypeBadge from "../_components/type-badge";

import { Button } from "@/app/_components/ui/button";

import { TrashIcon } from "lucide-react";

import {
  TRANSACTION_CATEGORIES_LABELS,
  TRANSACTION_RECURRENCE_TYPE_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";

import EditTransactionButton from "../_components/edit-transaction-button";

//import { Button } from "@/app/_components/ui/button";
//import EditTransactionButton from "../_components/edit-transaction-button";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    // Badge: ifs type-badge.tsx
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },

  {
    accessorKey: "categories",
    header: "Categoria",
    // Map Dicionario
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORIES_LABELS[transaction.categories],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },

  {
    accessorKey: "recurrenceType",
    header: "Recorrência",
    // Map Dicionario
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_RECURRENCE_TYPE_LABELS[transaction.recurrenceType],
  },
  {
    accessorKey: "installments",
    header: "Parcelas",
  },

  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    //api of international
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    // Ações
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];

export default transactionColumns;
