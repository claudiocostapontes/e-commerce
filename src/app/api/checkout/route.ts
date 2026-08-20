// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { CheckoutSchema } from '@/features/checkout/schemas/checkout.schema';

// 1. Estendemos o schema do formulário para incluir os itens do carrinho na requisição
const CheckoutPayloadSchema = CheckoutSchema.extend({
  items: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'O carrinho não pode estar vazio'),
});

// Mock da "Base de Produtos" para buscar o preço real (Em prod, buscaria do DB de produtos/ERP)
const getProductPriceFromDB = async (productId: string) => {
  const db = {
    'f47ac10b-58cc-4372-a567-0e02b2c3d479': 3499.00,
    '550e8400-e29b-41d4-a716-446655440000': 1899.90,
  };
  return db[productId as keyof typeof db] || null;
};

async function POST(request: Request) {
  try {
    const body = await request.json();

    // 2. Validação rigorosa dos dados de entrada (Sanitization)
    const parsedData = CheckoutPayloadSchema.parse(body);

    // 3. Validação de Regra de Negócio: Recálculo do Total no Servidor (Zero Trust)
    let calculatedTotal = 0;
    const validatedItems = [];

    for (const item of parsedData.items) {
      const realPrice = await getProductPriceFromDB(item.id);
      
      if (!realPrice) {
        return NextResponse.json({ error: `Produto ${item.id} não encontrado/indisponível.` }, { status: 400 });
      }

      calculatedTotal += realPrice * item.quantity;
      validatedItems.push({
        productId: item.id,
        quantity: item.quantity,
        price: realPrice,
      });
    }

    // 4. Persistência no Banco de Dados usando Transaction
    // Se o pedido ou os itens falharem, ocorre um rollback automático
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          fullName: parsedData.fullName,
          email: parsedData.email,
          document: parsedData.document,
          zipCode: parsedData.zipCode,
          addressNumber: parsedData.addressNumber,
          paymentMethod: parsedData.paymentMethod,
          totalAmount: calculatedTotal,
          items: {
            create: validatedItems.map(item => ({
              productId: item.productId,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });

      return newOrder;
    });

    return NextResponse.json({ 
      success: true, 
      orderId: order.id, 
      message: 'Pedido criado com sucesso' 
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    
    console.error('Erro no Checkout BFF:', error);
    return NextResponse.json({ error: 'Erro interno ao processar pedido' }, { status: 500 });
  }
}

export default POST