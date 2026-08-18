// src/app/(shop)/produto/[slug]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Product } from '@/features/catalog/schemas/product.schema';

// 1. Time-based Revalidation: Cacheia o HTML gerado por 1 hora
export const revalidate = 3600; 

interface ProductPageProps {
  params: { slug: string };
}

// Mock de fetch (em produção, bateria no seu BFF ou Prisma)
async function getProduct(slug: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`);
  if (!res.ok) return null;
  const products: Product[] = await res.json();
  return products.find((p) => p.slug === slug) || null;
}

// 2. SEO Dinâmico: Gera metadados específicos para cada produto
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return { title: 'Produto não encontrado' };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      images: [product.imageUrl],
    },
  };
}

// 3. Renderização do Server Component
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound(); // Retorna 404 automaticamente otimizado
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority // LCP Optimization: Carrega a imagem principal imediatamente
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="text-3xl font-bold text-gray-900 mb-8">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </div>
          
          <button className="w-full md:w-auto rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-blue-700">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </article>
  );
}