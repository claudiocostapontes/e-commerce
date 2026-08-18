Documentação de Arquitetura e Requisitos 
E-commerce (V1.0)
1. Visão Geral do Projeto
O sistema é uma plataforma de e-commerce responsiva para móveis e eletrodomésticos, projetada com foco absoluto em alta performance, manutenibilidade, segurança rigorosa (Zero Trust) e escalabilidade técnica.
2. Stack Tecnológica Base
•	Frontend / SSR: Next.js 14+ (App Router) com React Server Components (RSC).
•	Linguagem: TypeScript (Strict Mode).
•	Estilização e UI: Tailwind CSS, componentes primitivos acessíveis (WAI-ARIA) com suporte de lucide-react, clsx e tailwind-merge.
•	Gerenciamento de Estado: Zustand (Client-side persistido).
•	Formulários e Validação: React Hook Form com Zod (Validação Client/Server).
•	Banco de Dados e ORM: Prisma ORM (SQLite em dev, preparado para PostgreSQL em produção).
•	Testes: Jest com React Testing Library (RTL).
3. Arquitetura de Software
O projeto utiliza uma Arquitetura Modular Orientada a Domínios (Feature-based Colocation).
•	/app: Camada exclusiva de roteamento, layouts e injeção de dependências.
•	/features: Módulos de negócio isolados (/cart, /catalog, /checkout). Cada feature possui seus próprios componentes, schemas, hooks e testes de forma co-localizada.
•	/api (BFF - Backend For Frontend): Route Handlers que atuam como proxy seguro, ocultando regras de negócio e credenciais do cliente.
4. Requisitos Não Funcionais (RNFs) implementados

4.1. Segurança (Hardening)

•	Content Security Policy (CSP) Dinâmico: Implementado via Edge Middleware (middleware.ts), gerando e injetando um nonce criptográfico único por requisição.
•	Security Headers: Configuração estrita de HSTS, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy e Permissions-Policy.
•	Sanitização e Zero Trust: Nenhuma precificação vinda do cliente é confiável. O recálculo de totais ocorre obrigatoriamente no servidor (BFF + Prisma).

4.2. Performance e SEO
•	Otimização de Mídia: Uso mandatório do next/image com formatos WebP/AVIF e aspect-ratio travado para eliminar o Cumulative Layout Shift (CLS).
•	Otimização de Fontes: Hospedagem local de fontes nativas (Google Fonts Inter) com display: swap.
•	Estratégias de Cache Next.js:
o	Time-based Revalidation (ISR): Catálogo em cache gerado estaticamente, com revalidação automática.
o	On-demand Revalidation: Webhook seguro (/api/revalidate) preparado para invalidação de cache via ERP/Backoffice.
•	Deep Linking: Filtros de catálogo gerenciados via Query Parameters na URL para indexação otimizada.
5. Casos de Uso e Fluxos Concluídos (Fase 1)
1.	Navegação no Catálogo: Visualização responsiva (Mobile-first grid), filtragem por categorias e injeção dinâmica de metadados SEO nas páginas de detalhe do produto.
2.	Gerenciamento de Carrinho: Adição, remoção e alteração de quantidade de itens, com estado global e persistência local, mitigando erros de hidratação.
3.	Checkout Mockado: Captura de dados de entrega e pagamento com validações rigorosas e tratamento amigável de erros de UI, finalizando com o recálculo via API e registro transacional no banco de dados.
6. Garantia de Qualidade (QA)
1.	Suíte de testes automatizados unitários e de integração validando regras de negócio da store (Zustand) e comportamentos de interface (validações Zod no formulário).
2.	Para a geração do PDF, você pode usar uma ferramenta de linha de comando integrada ao projeto ou uma extensão da sua IDE.
3.	Posso incluir no seu package.json um script com a biblioteca md-to-pdf para automatizar essa exportação direto pelo terminal, ou você prefere que continuemos adicionando os próximos épicos (Autenticação, Pagamentos, etc.) a este documento antes de focarmos na geração do arquivo final?

