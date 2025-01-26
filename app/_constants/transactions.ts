import {
  TransactionCategories,
  TransactionPaymentMethod,
  TransactionType,
  TransactionRecurrenceType,
} from "@prisma/client";

export const TRANSACTION_CATEGORIES_LABELS = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
};

export const TRANSACTION_RECURRENCE_TYPE_LABELS = {
  DAILY: "Diário",
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
};
export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
  },
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
  },
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
  },
];

export const TRANSACTION_CATEGORIES_OPTIONS = [
  {
    value: TransactionCategories.EDUCATION,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.EDUCATION],
  },
  {
    value: TransactionCategories.ENTERTAINMENT,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.ENTERTAINMENT],
  },
  {
    value: TransactionCategories.FOOD,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.FOOD],
  },
  {
    value: TransactionCategories.HEALTH,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.HEALTH],
  },
  {
    value: TransactionCategories.HOUSING,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.HOUSING],
  },
  {
    value: TransactionCategories.OTHER,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.OTHER],
  },
  {
    value: TransactionCategories.SALARY,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.SALARY],
  },
  {
    value: TransactionCategories.TRANSPORTATION,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.TRANSPORTATION],
  },
  {
    value: TransactionCategories.UTILITY,
    label: TRANSACTION_CATEGORIES_LABELS[TransactionCategories.UTILITY],
  },
];

export const TRANSACTION_RECURRENCE_TYPE_OPTIONS = [
  {
    value: TransactionRecurrenceType.DAILY,
    label: TRANSACTION_RECURRENCE_TYPE_LABELS[TransactionRecurrenceType.DAILY],
  },
  {
    value: TransactionRecurrenceType.MONTHLY,
    label:
      TRANSACTION_RECURRENCE_TYPE_LABELS[TransactionRecurrenceType.MONTHLY],
  },
  {
    value: TransactionRecurrenceType.WEEKLY,
    label: TRANSACTION_RECURRENCE_TYPE_LABELS[TransactionRecurrenceType.WEEKLY],
  },
];
