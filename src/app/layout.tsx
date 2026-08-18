// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import '@/styles/globals.css';

// Otimização: Subsets reduzidos, display swap e variável CSS para Tailwind
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | E-commerce Moderno',
    default: 'E-commerce Moderno - Móveis e Eletrodomésticos',
  },
  description: 'Compre móveis e eletrodomésticos com alta performance e segurança.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const nonce = headersList.get('x-nonce') || '';

  return (
    <html lang="pt-BR" dir="ltr" className={inter.variable}>
      {/* A classe font-sans foi configurada no Tailwind para usar a var --font-inter */}
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}