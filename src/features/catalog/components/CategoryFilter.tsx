// src/features/catalog/components/CategoryFilter.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { label: 'Todos', value: 'ALL' },
  { label: 'Móveis', value: 'MÓVEIS' },
  { label: 'Eletrodomésticos', value: 'ELETRODOMÉSTICOS' },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'ALL';

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'ALL') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    
    // push de forma amigável sem causar refresh completo na página (Soft Navigation)
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Categorias</h2>
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
        {CATEGORIES.map((category) => {
          const isActive = currentCategory === category.value;
          return (
            <button
              key={category.value}
              onClick={() => handleFilter(category.value)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-left transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}