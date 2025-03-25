import { PrismaClient } from "@prisma/client"; // correcao de erro  'ERR_UNKNOWN_FILE_EXTENSION ,ARG_UNKNOWN_OPTION
//const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.transaction.deleteMany(); // Limpa os registros anteriores

    const transactions = await prisma.transaction.createMany({
      data: [
        {
          id: "1a2b3c4d-1111-1111-1111-123456789xabc",
          name: "Elisabete",
          type: "DEPOSIT",
          amount: 8000.0,
          categories: "SALARY",
          isRecurring: true,
          recurrenceType: "YEARLY",
          installments: 12,
          paymentMethod: "BANK_TRANSFER",
          description: "Salário recebido da empresa",
          date: new Date("2024-02-01"),
          userId: "Elisabete",
        },
        {
          id: "1a2b3c4d-2222-2222-2222-123456789vbc",
          name: "Weden",
          type: "EXPENSE",
          amount: 1200.0,
          categories: "HOUSING",
          isRecurring: true,
          recurrenceType: "QUARTERLY",
          installments: 3,
          paymentMethod: "BANK_TRANSFER",
          description: "Pagamento do aluguel",
          date: new Date("2024-03-05"),
          userId: "Weden",
        },
        {
          id: "1a2b3c4d-3333-3333-3333-123456789dbc",
          name: "Rogério",
          type: "EXPENSE",
          amount: 300.5,
          categories: "FOOD",
          isRecurring: true,
          recurrenceType: "BIMONTHLY",
          installments: 2,
          paymentMethod: "CREDIT_CARD",
          description: "Supermercado semanal",
          date: new Date("2024-03-10"),
          userId: "Rogério",
        },
        {
          id: "1a2b3c4d-4444-4444-4444-123456789acc",
          name: "Pedro",
          type: "INVESTMENT",
          amount: 1500.0,
          categories: "OTHER",
          isRecurring: true,
          recurrenceType: "YEARLY",
          installments: 12,
          paymentMethod: "BANK_TRANSFER",
          description: "Compra de ações na bolsa",
          date: new Date("2024-03-15"),
          userId: "user-4",
        },
        {
          id: "1a2b3c4d-1111-1111-1111-123456789abc",
          name: "Bianca",
          type: "DEPOSIT",
          amount: 5000.0,
          categories: "SALARY",
          isRecurring: true,
          recurrenceType: "MONTHLY",
          installments: 1,
          paymentMethod: "BANK_TRANSFER",
          description: "Salário recebido da empresa",
          date: new Date("2024-03-01"),
          userId: "user-1",
        },
        {
          id: "1a2b3c4d-2222-2222-2222-123456789abc",
          name: "Aluguel do Apartamento",
          type: "EXPENSE",
          amount: 1200.0,
          categories: "HOUSING",
          isRecurring: true,
          recurrenceType: "MONTHLY",
          installments: 1,
          paymentMethod: "BANK_TRANSFER",
          description: "Pagamento do aluguel",
          date: new Date("2024-03-05"),
          userId: "user-2",
        },
        {
          id: "1a2b3c4d-3333-3333-3333-123456789abc",
          name: "Compra no Mercado",
          type: "DEPOSIT",
          amount: 300.5,
          categories: "FOOD",
          isRecurring: true,
          recurrenceType: "BIWEEKLY",
          installments: 2,
          paymentMethod: "CREDIT_CARD",
          description: "Supermercado 15 dias",
          date: new Date("2024-03-10"),
          userId: "user-3",
        },
      ],
    });

    console.log("Transações criadas:", transactions);
  } catch (error) {
    console.error("Erro ao criar as transações:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executa o script
main();
