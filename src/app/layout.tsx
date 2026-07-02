
import type {Metadata} from 'next';
import './globals.css';
import { Analytics } from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'Kit WhatsApp da Confeitaria | DoceZap',
  description: 'Respostas melhores, combinados, cardápio e datas para organizar o atendimento da confeitaria no WhatsApp.',
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
