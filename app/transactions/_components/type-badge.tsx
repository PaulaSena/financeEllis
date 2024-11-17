import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted text-lime-500 hover:bg-muted">
        <CircleIcon className="mr-2 w-3 fill-lime-500 font-bold" size={10}>
          {" "}
        </CircleIcon>
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-muted text-red-600 hover:bg-muted">
        <CircleIcon className="mr-2 w-3 fill-red-600 font-bold" size={10}>
          {" "}
        </CircleIcon>
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted text-gray-300 hover:bg-muted">
      <CircleIcon className="mr-2 w-3 fill-gray-300 font-bold" size={10}>
        {" "}
      </CircleIcon>
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
