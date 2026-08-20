import './globals.css';

export const metadata = {
  title: 'Minha Loja',
  description: 'O melhor e-commerce',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}