'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';

export function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/80 backdrop-blur-md pb-safe sm:hidden">
      <div className="flex h-16 items-center justify-around px-4">
        <Link href="/" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}>
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Início</span>
        </Link>
        <Link href="/cart" className={`relative flex flex-col items-center gap-1 transition-colors ${pathname === '/cart' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}>
          <div className="relative">
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider">Carrinho</span>
        </Link>
        <Link href="/login" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/login' || pathname === '/register' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}>
          <User className="h-6 w-6" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Perfil</span>
        </Link>
      </div>
    </div>
  );
}
