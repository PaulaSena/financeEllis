import { db } from "../_lib/prisma";
import { DataTable } from "@/app/_components/ui/data-table";

import transactionColumns from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TransactionsPage = async () => {
  // se usuario nao logado redirecione para o login
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  // Acessar as TRANSAÇÕES da tabela no banco de dados

  const transactions = await db.transaction.findMany({
    // Acessar apenas os dados do usuario atyal

    where: {
      userId,
    },
  });

  return (
    <div className="space-y-6 p-6">
      {/* TÍTULO E BOTÃO */}
      <div className="flex w-full items-center justify-between p-6">
        <h1 className="w-fill ml-0 mr-4 text-2xl font-bold">Transações</h1>
        {/*add-transactions-button.tsx*/}
        <AddTransactionButton />

        {/* {transactions.map(transaction => transaction.name)} <br />*/}
      </div>
      {/*RENDERIZANDO A TABELA CRIADA NO COLUMNS INDEX*/}

      <DataTable
        columns={transactionColumns}
        data={transactions}
        w-full
        h-full
      />
    </div>
  );
};

export default TransactionsPage;
