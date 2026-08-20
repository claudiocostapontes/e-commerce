import { NextResponse } from 'next/server';
import { ProductSchema } from '@/features/catalog/schemas/product.schema';
import { z } from 'zod';

export async function GET() {
  const mockProducts = [
    {
      id: '1',
      name: 'Sofá Moderno',
      description: 'Sofá confortável de 3 lugares',
      price: 1200.00,
      imageUrl: '/images/sofa.jpg',
      stock: 10,
    },
  ];

  try {
    const validatedData = z.array(ProductSchema).parse(mockProducts);
    return NextResponse.json(validatedData);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao validar produtos' }, { status: 500 });
  }
}