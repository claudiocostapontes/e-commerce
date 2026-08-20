// src/components/layout/Header.tsx
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 backdrop-blur-md shadow-sm transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-900">
          Lojão<span className="text-blue-600">Móveis</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative text-slate-600 hover:text-blue-600 transition-colors">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
              0
            </span>
          </Link>
          <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            <User className="h-5 w-5" />
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}