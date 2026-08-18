// src/app/(shop)/layout.tsx
import { BottomNav } from '@/components/common/BottomNav';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      {/* Header Desktop entraria aqui */}
      <main className="flex-1">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}