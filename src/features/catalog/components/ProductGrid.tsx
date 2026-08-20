// src/features/catalog/components/ProductGrid.tsx
import { ProductCard } from './ProductCard';
import type { Product } from '../schemas/product.schema';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50">
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}