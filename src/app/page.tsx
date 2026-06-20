
import FunnelContainer from '@/components/funnel/FunnelContainer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <FunnelContainer />
      <footer className="mx-auto max-w-lg px-6 py-8 text-center text-xs leading-relaxed text-muted-foreground">
        <p>© 2026 DoceZap IA • Todos os direitos reservados.</p>
        <p className="mt-2">O DoceZap IA é um assistente de escrita. Os resultados dependem das informações fornecidas e do uso.</p>
      </footer>
    </main>
  );
}
