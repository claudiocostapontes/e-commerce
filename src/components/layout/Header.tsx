// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, LogOut, User } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
          Lojão Móveis
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Seção de Autenticação */}
          {status === 'loading' ? (
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200"></div>
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                Olá, {session.user?.name?.split(' ')[0]}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:block">Entrar</span>
            </Link>
          )}

          {/* Carrinho */}
          <Link href="/cart" className="relative p-2 text-gray-600 transition-colors hover:text-blue-600">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}