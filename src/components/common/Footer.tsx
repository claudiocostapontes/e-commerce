// src/components/common/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Lojão Móveis. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">Termos</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}