// src/features/checkout/components/CheckoutForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutSchema, CheckoutFormData } from '../schemas/checkout.schema';
import { useCartStore } from '@/features/cart/store/useCartStore';

export function CheckoutForm() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // Monta o payload combinando os dados do form (Zod) e os itens do carrinho (Zustand)
      const payload = {
        ...data,
        items: cartItems.map(item => ({ id: item.id, quantity: item.quantity }))
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao processar');
      }
      
      alert(`Pedido finalizado! Código: ${result.orderId}`);
      clearCart();
      reset();
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl bg-gray-50 p-6 border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados de Entrega e Pagamento</h3>
      
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nome Completo</label>
        <input
          {...register('fullName')}
          id="fullName"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            disabled={isSubmitting}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="document" className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            {...register('document')}
            id="document"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            disabled={isSubmitting}
          />
          {errors.document && <p className="mt-1 text-xs text-red-600">{errors.document.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">CEP</label>
          <input
            {...register('zipCode')}
            id="zipCode"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            disabled={isSubmitting}
          />
          {errors.zipCode && <p className="mt-1 text-xs text-red-600">{errors.zipCode.message}</p>}
        </div>
        <div>
          <label htmlFor="addressNumber" className="block text-sm font-medium text-gray-700">Número</label>
          <input
            {...register('addressNumber')}
            id="addressNumber"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            disabled={isSubmitting}
          />
          {errors.addressNumber && <p className="mt-1 text-xs text-red-600">{errors.addressNumber.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Pagamento</label>
        <select
          {...register('paymentMethod')}
          id="paymentMethod"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          disabled={isSubmitting}
        >
          <option value="">Selecione...</option>
          <option value="PIX">Pix (Aprovação instantânea)</option>
          <option value="CREDIT_CARD">Cartão de Crédito</option>
          <option value="BOLETO">Boleto Bancário</option>
        </select>
        {errors.paymentMethod && <p className="mt-1 text-xs text-red-600">{errors.paymentMethod.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Processando...' : 'Finalizar Pedido'}
      </button>
    </form>
  );
}