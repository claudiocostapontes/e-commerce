// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // 1. Segurança: Verifica se a requisição possui o token secreto
    const secret = request.nextUrl.searchParams.get('secret');
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Token de revalidação inválido' }, { status: 401 });
    }

    const body = await request.json();
    const { path, tag } = body;

    // 2. Revalidação por Path (ex: /produto/geladeira-frost-free)
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, type: 'path', path, now: Date.now() });
    }

    // 3. Revalidação por Tag (ex: 'catalog') - Útil para limpar listas inteiras de uma vez
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, type: 'tag', tag, now: Date.now() });
    }

    return NextResponse.json({ message: 'Forneça um path ou tag para revalidar' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao processar revalidação' }, { status: 500 });
  }
}