"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

interface IntroStepProps {
  onStart: () => void;
}

export function IntroStep({ onStart }: IntroStepProps) {
  return (
    <div className="py-8 sm:py-12">
      <div className="mb-9 flex items-center justify-center gap-2 font-bold text-primary">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20">
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="text-lg">DoceZap IA</span>
      </div>

      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          <MessageCircle className="h-3.5 w-3.5" />
          Diagnóstico personalizado
        </div>
        <h1 className="mx-auto max-w-md text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
          Seu WhatsApp ajuda a <span className="text-primary">fechar encomendas</span> ou deixa vendas escaparem?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          Responda 5 perguntas. No final, veja uma resposta criada para a situação que mais trava seu atendimento — no seu jeito de falar.
        </p>
      </div>

      <Button
        onClick={onStart}
        size="lg"
        className="mt-9 h-16 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98] sm:mt-10"
      >
        Fazer meu diagnóstico
        <ArrowRight className="h-5 w-5" />
      </Button>

      <p className="mt-3 text-center text-xs font-medium text-muted-foreground">
        Grátis • sem cadastro • leva 1 minuto
      </p>
    </div>
  );
}
