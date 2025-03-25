//import { Button } from "./ui/button";
import { Button } from "@/app/_components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  TRANSACTION_CATEGORIES_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_RECURRENCE_TYPE_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "../_constants/transactions";

import { DatePicker } from "./ui/date-picker";
import { z } from "zod";
import {
  TransactionType,
  TransactionRecurrenceType,
  TransactionCategories,
  TransactionPaymentMethod,
} from "@prisma/client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertTransaction } from "../_actions/upsert-transaction";

interface UpsertTransactionDialogProps {
  isOpen: boolean;
  transactionId?: string;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: Partial<FormSchema>;
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z
    .number({
      required_error: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor deve ser positivo.",
    }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatório.",
  }),
  //isRecurring: z.boolean().optional(),
  isRecurring: z.boolean().default(false),
  recurrenceType: z.nativeEnum(TransactionRecurrenceType).optional(),
  installments: z
    .number()
    .positive("O número de parcelas deve ser positivo.")
    .min(1, "Deve haver pelo menos uma parcela.")
    .optional(),

  categories: z.nativeEnum(TransactionCategories, {
    required_error: "As categorias são obrigatórias.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamento é obrigatório.",
  }),
  description: z.string({
    message: "Detalhes da transação.",
  }),
  date: z.date({
    required_error: "A data é obrigatória.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertTransactionDialog = ({
  isOpen,
  defaultValues,
  transactionId,
  setIsOpen,
}: UpsertTransactionDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      amount: 50,
      isRecurring: false,
      recurrenceType: TransactionRecurrenceType.DAILY,
      installments: 1,
      categories: TransactionCategories.OTHER,
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
      description: "",
      date: new Date(),
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const { installments, date, recurrenceType, isRecurring } = data;

      if (isRecurring && installments && installments > 1) {
        const transactions = Array.from({ length: installments }, (_, i) => {
          const newDate = new Date(date);

          switch (recurrenceType) {
            case TransactionRecurrenceType.DAILY:
              newDate.setDate(date.getDate() + (i + 1)); // Adiciona 1 dia por parcela
              break;
            case TransactionRecurrenceType.WEEKLY:
              newDate.setDate(date.getDate() + 7 * (i + 1)); // Adiciona 7 dias por parcela
              break;
            case TransactionRecurrenceType.BIWEEKLY: // Quinzenal
              newDate.setDate(date.getDate() + 14 * (i + 1)); // Adiciona 14 dias por parcela
              break;
            case TransactionRecurrenceType.MONTHLY:
              newDate.setMonth(date.getMonth() + (i + 1)); // Adiciona 1 mês por parcela
              break;
            case TransactionRecurrenceType.BIMONTHLY: // Bimestral
              newDate.setMonth(date.getMonth() + 2 * (i + 1)); // Adiciona 2 meses por parcela
              break;
            case TransactionRecurrenceType.QUARTERLY: // Trimestral
              newDate.setMonth(date.getMonth() + 3 * (i + 1)); // Adiciona 3 meses por parcela
              break;
            case TransactionRecurrenceType.YEARLY:
              newDate.setFullYear(date.getFullYear() + (i + 1)); // Adiciona 1 ano por parcela
              break;
          }

          return { ...data, date: newDate, id: undefined };
        });

        await Promise.all(
          transactions.map((transaction) => {
            const { recurrenceType, installments, ...rest } = transaction;

            return upsertTransaction({
              ...rest,
              recurrenceType: recurrenceType ?? TransactionRecurrenceType.DAILY, // Garante um valor válido
              installments: installments ?? 1, // Se for undefined, define como 1
              isRecurring: transaction.isRecurring ?? false,
            });
          }),
        );
      }
      await upsertTransaction({
        ...data,
        id: transactionId,
        recurrenceType: data.recurrenceType ?? TransactionRecurrenceType.DAILY,
        installments: data.installments ?? 1,
      });

      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const isUpdate = Boolean(transactionId);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Criar"} Transação
          </DialogTitle>

          <DialogDescription> Insira as Informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite um nome" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o Tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRecurring"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pagamento Recorrente</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={field.value ? "true" : "false"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione se é recorrente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Sim</SelectItem>
                        <SelectItem value="false">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("isRecurring") && (
              <>
                <FormField
                  control={form.control}
                  name="recurrenceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Recorrência</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de recorrência" />
                        </SelectTrigger>
                        <SelectContent>
                          {TRANSACTION_RECURRENCE_TYPE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Parcelas</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Digite o número de parcelas"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          } //para garantir que ele seja tratado como número
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorias</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORIES_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor"
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Transação</FormLabel>
                  <FormControl>
                    <Input placeholder="Detalhes da transação" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Pagamento</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertTransactionDialog;
