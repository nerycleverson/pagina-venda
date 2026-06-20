"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, MessageCircle, Sparkles } from 'lucide-react';

interface IntroStepProps {
  onStart: () => void;
}

export function IntroStep({ onStart }: IntroStepProps) {
  return (
    <div className="py-6 sm:py-10">
      <div className="mb-8 flex items-center justify-center gap-2 font-bold text-primary">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20">
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="text-lg">DoceZap IA</span>
      </div>

      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          <MessageCircle className="h-3.5 w-3.5" />
          Diagnóstico de 1 minuto
        </div>
        <h1 className="mx-auto max-w-md text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl">
          Seu WhatsApp ajuda a <span className="text-primary">fechar encomendas</span> ou deixa vendas escaparem?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          Responda 5 perguntas e veja como o DoceZap responderia uma cliente no seu jeito de falar.
        </p>
      </div>

      <div className="relative mx-auto my-7 max-w-sm rounded-[26px] border border-primary/10 bg-white p-4 shadow-xl shadow-primary/10">
        <div className="mb-4 flex items-center gap-3 border-b pb-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-bold text-white">DZ</span>
          <div className="text-left">
            <p className="text-sm font-bold">DoceZap IA</p>
            <p className="text-[11px] text-green-700">pronto para ajudar</p>
          </div>
        </div>
        <div className="space-y-3 text-left text-sm">
          <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2.5">
            Amei esse bolo de chocolate, mas R$ 130 ficou caro pra mim 😅
          </div>
          <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-whatsapp-bg px-3 py-2.5 text-whatsapp-text">
            Entendi! Esse bolo de chocolate é feito à mão, encomenda exclusiva pra você, bem diferente de qualquer coisa pronta por aí. O valor de R$ 130 se mantém. Quer que eu te mande uma foto de um que já fiz parecido?
            <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-green-800/60">
              agora <Check className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={onStart}
        size="lg"
        className="h-16 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
      >
        Fazer meu diagnóstico
        <ArrowRight className="h-5 w-5" />
      </Button>

      <p className="mt-3 text-center text-xs font-medium text-muted-foreground">
        Diagnóstico grátis • sem cadastro • planos a partir de R$ 15
      </p>
    </div>
  );
}
