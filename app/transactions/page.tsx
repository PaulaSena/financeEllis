import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import transactionColumns from "./_columns";

const TransactionsPage = async () => {
  // Acessar as TRANSAÇÕES da tabela no banco de dados

  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      {/* TÍTULO E BOTÃO */}
      <div className="flex w-full items-center justify-between p-6">
        <h1 className="w-fill ml-0 mr-4 text-2xl font-bold">Transações</h1>
        <Button className="mr-20 rounded-full">
          Adicionar transação
          <ArrowDownUpIcon className="ml-1" />
        </Button>

        {/* {transactions.map(transaction => transaction.name)} <br />*/}
      </div>
      {/*RENDERIZANDO A TABELA CRIADA NO COLUMNS INDEX*/}

      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
