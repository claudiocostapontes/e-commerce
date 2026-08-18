// src/features/checkout/schemas/checkout.schema.ts
import { z } from 'zod';

export const CheckoutSchema = z.object({
  fullName: z.string().min(5, 'O nome completo é obrigatório'),
  email: z.string().email('E-mail inválido'),
  document: z.string().min(11, 'CPF inválido').max(14),
  zipCode: z.string().min(8, 'CEP inválido'),
  addressNumber: z.string().min(1, 'Número é obrigatório'),
  paymentMethod: z.enum(['PIX', 'CREDIT_CARD', 'BOLETO'], {
    // errorMap intercepta qualquer tipo de erro (seja campo vazio ou valor inválido)
    errorMap: () => ({ message: 'Selecione um método de pagamento' }),
  }),
});

export type CheckoutFormData = z.infer<typeof CheckoutSchema>;