// src/app/(shop)/page.tsx
import { ProductGrid } from '@/features/catalog/components/ProductGrid';
import type { Product } from '@/features/catalog/schemas/product.schema';

// React Server Component (RSC) nativo do App Router
export default async function HomePage() {
  // Chamada para o nosso BFF. Em Server Components, precisamos usar URL absoluta.
  // Em prod, você trocaria a variável de ambiente para sua URL real.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 3600 }, // ISR: Cacheia o HTML por 1 hora
  });

  if (!res.ok) {
    // Tratar erro adequadamente (acionará o error.tsx mais próximo)
    throw new Error('Falha ao carregar produtos');
  }

  const products: Product[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Nossa Seleção
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Móveis e eletrodomésticos com as melhores condições.
        </p>
      </header>
      
      <ProductGrid products={products} />
    </div>
  );
}