// src/app/page.tsx
"use client"; // Adicionado para permitir hooks (useState, useEffect) se precisar

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Se você tiver um componente de Produto, descomente a linha abaixo e importe:
// import ProductCard from '@/features/products/components/ProductCard';

export default function HomePage() {
  // Estado para simular produtos (se não tiver API ainda)
  // No futuro, você trocará isso por um fetch()
  const [products, setProducts] = useState<any[]>([]);

  // Exemplo de busca de produtos na API (descomente quando sua API estiver pronta)
  /*
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  */

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Cabeçalho */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
          Minha Loja
        </h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/shop" style={{ color: '#0070f3', textDecoration: 'underline' }}>Shop</Link>
          <Link href="/auth/register" style={{ color: '#0070f3', textDecoration: 'underline' }}>Registro</Link>
          <Link href="/api/auth/signin" style={{ color: '#0070f3', textDecoration: 'underline' }}>Login</Link>
        </nav>
      </header>

      {/* Lista de Produtos */}
      <section>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Produtos em Destaque</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {/* Exemplo de Produtos (Enquanto a API não retorna dados) */}
          {products.length === 0 ? (
            <p style={{ color: '#888' }}>Nenhum produto encontrado no momento.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem' }}>
                <h3>{product.name}</h3>
                <p style={{ fontWeight: 'bold', color: '#0070f3' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>
                {/* Se você tiver o componente ProductCard, use <ProductCard key={product.id} product={product} /> */}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Rodapé simples */}
      <footer style={{ marginTop: '4rem', borderTop: '1px solid #eee', paddingTop: '1rem', textAlign: 'center', color: '#888' }}>
        <p>&copy; 2026 Minha Loja. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}