//Caso utilize seeds para popular o banco em ambientes de desenvolvimento, atualize o script prisma/seed.ts para refletir os novos campos.
await prisma.transaction.create({
  data: {
    name: "Exemplo",
    amount: 100.0,
    type: "EXPENSE",
    category: "OTHER",
    paymentMethod: "CREDIT_CARD",
    description: "Teste",
    date: new Date(),
    recurrence: true,
    installments: 3,
  },
});
