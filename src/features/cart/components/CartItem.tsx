// src/features/cart/components/CartItem.tsx
'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  };
}

export function CartItem({ item }: CartItemProps) {
  // Acessamos as ações da store
  const { addItem, removeItem } = useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
  }));

  // O Zod espera o objeto Product completo, mas para simplificar o incremento passamos o que temos
  const handleIncrement = () => addItem(item as any);
  const handleDecrement = () => removeItem(item.id);

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
        <p className="text-sm font-bold text-gray-900">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center rounded-md border border-gray-300">
            <button
              onClick={handleDecrement}
              className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label={item.quantity === 1 ? 'Remover item' : 'Diminuir quantidade'}
            >
              {item.quantity === 1 ? <Trash2 className="h-4 w-4 text-red-500" /> : <Minus className="h-4 w-4" />}
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}