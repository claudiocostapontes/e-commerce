// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ProductSchema } from '@/features/catalog/schemas/product.schema';

// Mock de dados (Em produção, aqui você faria o fetch para seu backend real/ERP usando fetch)
const MOCK_PRODUCTS = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Geladeira Frost Free 400L',
    description: 'Geladeira moderna com painel touch e alta eficiência energética.',
    price: 3499.0,
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=500&q=80',
    category: 'ELETRODOMÉSTICOS',
    slug: 'geladeira-frost-free-400l',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Sofá Retrátil 3 Lugares',
    description: 'Sofá confortável em suede, ideal para salas de estar.',
    price: 1899.9,
    imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=80',
    category: 'MÓVEIS',
    slug: 'sofa-retratil-3-lugares',
  },
];

export async function GET() {
  try {
    // Simulando delay de rede
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validando os dados de saída do backend para garantir que o front não quebre
    // Usamos array() do Zod para validar a lista toda
    const safeData = z.array(ProductSchema).parse(MOCK_PRODUCTS);

    return NextResponse.json(safeData);
  } catch (error) {
    console.error('BFF Error:', error);
    return NextResponse.json(
      { error: 'Falha ao recuperar catálogo' },
      { status: 500 }
    );
  }
}