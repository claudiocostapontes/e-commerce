// src/features/catalog/components/ProductCard.tsx
'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import type { Product } from '../schemas/product.schema';
import toast from 'react-hot-toast'; // <-- Novo import

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative mx-3 mt-3 flex h-60 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        <span className="text-sm text-gray-400">Imagem: {product.name}</span>
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-lg font-semibold tracking-tight text-slate-900">{product.name}</h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p className="text-2xl font-bold text-slate-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
        </div>
        <button
          onClick={handleAddToCart} // <-- Usando a nova função
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}