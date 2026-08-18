// src/app/(shop)/carrinho/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { CartItem } from '@/features/cart/components/CartItem';
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  const { items, totalPrice } = useCartStore((state) => ({
    items: state.items,
    totalPrice: state.totalPrice,
  }));

  // Previne Hydration Error aguardando a renderização no Client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="container mx-auto p-8 animate-pulse bg-gray-100 h-[50vh] rounded-xl mt-8"></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continuar comprando
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">Seu Carrinho</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-24 text-center">
          <ShoppingBag className="mb-4 h-12 w-12 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-900">Seu carrinho está vazio</h2>
          <p className="mt-2 text-gray-500">Volte para a loja e adicione alguns produtos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Lista de Produtos (Esquerda) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 border-b pb-4">
                Itens selecionados ({items.length})
              </h2>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center text-xl font-bold text-gray-900 border-t pt-4">
                <span>Total:</span>
                <span>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout (Direita) */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <CheckoutForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}