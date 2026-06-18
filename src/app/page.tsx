
import FunnelContainer from '@/components/funnel/FunnelContainer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <FunnelContainer />
      <footer className="py-8 text-center text-xs text-muted-foreground px-4">
        <p>© 2024 DoceZap IA - Todos os direitos reservados.</p>
        <p className="mt-2">O DoceZap IA é um assistente virtual e não garante faturamento mínimo. Os resultados variam de acordo com o uso.</p>
      </footer>
    </main>
  );
}
