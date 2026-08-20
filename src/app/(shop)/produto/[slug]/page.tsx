// src/app/(shop)/produto/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetails from '@/features/catalog/components/ProductDetails';

// Definição do tipo Product (caso não esteja importando de um arquivo externo)
// Você pode manter ou ajustar conforme seu projeto
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
}

// 1. Função para buscar o produto
async function getProduct(slug: string): Promise<Product | null> {
  // Consome sua própria API de produtos
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`);
  if (!res.ok) return null;
  const products: Product[] = await res.json();

  // 👇 CORREÇÃO AQUI: Usando `id` ao invés de `slug`
  return products.find((p) => p.id === slug) || null;
}

// 2. SEO Dinâmico: Gera metadados específicos para cada produto
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Produto não encontrado',
    };
  }

  return {
    title: product.name,
    description: product.description || `Descrição de ${product.name}`,
  };
}

// 3. Página do Produto
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  // Se o produto não existir, retorna página 404
  if (!product) {
    notFound();
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </div>
  );
}