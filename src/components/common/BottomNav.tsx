// src/components/common/BottomNav.tsx
'use client'; // Componente client-side pois consome estado do Zustand

import Link from 'next/link';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';

export function BottomNav() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    // Fica fixo no rodapé, visível apenas até o breakpoint 'md' (768px)
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-white pb-safe md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <Link href="/" className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-600 transition-colors">
        <Home className="h-6 w-6" />
        <span className="mt-1 text-[10px] font-medium">Início</span>
      </Link>
      
      <button className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-600 transition-colors">
        <Search className="h-6 w-6" />
        <span className="mt-1 text-[10px] font-medium">Buscar</span>
      </button>

      <Link href="/carrinho" className="relative flex flex-col items-center p-2 text-gray-500 hover:text-blue-600 transition-colors">
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {totalItems}
          </span>
        )}
        <span className="mt-1 text-[10px] font-medium">Carrinho</span>
      </Link>

      <Link href="/perfil" className="flex flex-col items-center p-2 text-gray-500 hover:text-blue-600 transition-colors">
        <User className="h-6 w-6" />
        <span className="mt-1 text-[10px] font-medium">Perfil</span>
      </Link>
    </nav>
  );
}