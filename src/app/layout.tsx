
import type {Metadata} from 'next';
import './globals.css';
import { Analytics } from '@/components/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://oferta.chocolaterende.com'),
  title: 'Cardápio Pronto para Pedido | Chocolate Rende',
  description: 'Organize produto, rendimento, preço, prazo e como pedir. Inclui DoceZap Premium por 30 dias e Combinados da Encomenda.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Cardápio Pronto para Pedido | Chocolate Rende',
    description: 'Organize produto, rendimento, preço, prazo e como pedir. Inclui DoceZap Premium por 30 dias e Combinados da Encomenda.',
    url: '/',
    siteName: 'Chocolate Rende',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/produtos/banner-cardapio-pronto-checkout.png',
        width: 2172,
        height: 724,
        alt: 'Cardápio Pronto para Pedido',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardápio Pronto para Pedido | Chocolate Rende',
    description: 'Organize produto, rendimento, preço, prazo e como pedir. Inclui DoceZap Premium por 30 dias e Combinados da Encomenda.',
    images: ['/produtos/banner-cardapio-pronto-checkout.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
