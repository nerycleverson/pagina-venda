"use client"

import React from 'react';
import { ArrowLeft, ArrowRight, Gauge, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiagnosisStepProps {
  answers: Record<number, string>;
  onBack: () => void;
  onNext: () => void;
}

const PAIN_DIAGNOSIS: Record<string, { title: string; label: string; insight: string }> = {
  "Cliente recebe o preço e some": {
    title: "É depois de mandar o preço que você mais perde clientes.",
    label: "Cliente some após o preço",
    insight: "Muitas clientes somem não só por causa do preço, mas porque a conversa para ali. Uma boa resposta mostra o valor do seu trabalho e facilita o próximo passo."
  },
  "Cliente pede desconto": {
    title: "Você quer manter seu preço sem afastar a cliente.",
    label: "Pedidos de desconto",
    insight: "Dar desconto na hora aperta sua margem. Você pode manter o preço e, se fizer sentido, oferecer uma mudança no tamanho, na quantidade ou na decoração."
  },
  "Cliente diz que está caro": {
    title: "Você precisa falar do seu preço com mais segurança.",
    label: "Cliente acha caro",
    insight: "Quando você explica demais, pode parecer insegura. O melhor é mostrar por que aquele pedido tem esse valor e depois conduzir a cliente."
  },
  "Não sei como conduzir a conversa": {
    title: "Você precisa saber o que responder para a conversa continuar.",
    label: "O que responder depois",
    insight: "Não basta só tirar a dúvida. A resposta também precisa mostrar para a cliente o que ela deve fazer em seguida."
  }
};

const getProfile = (stage: string, volume: string) => {
  if (stage === "É minha principal fonte de renda" || volume === "Mais de 30 clientes") {
    return "Você já vive da confeitaria";
  }
  if (stage === "É uma renda extra importante" || volume === "De 16 a 30 clientes" || volume === "De 6 a 15 clientes") {
    return "Suas encomendas estão crescendo";
  }
  if (stage === "Ainda faço só para família e amigos") {
    return "Você pode começar a vender para mais pessoas";
  }
  return "Você está começando a vender";
};

export function DiagnosisStep({ answers, onBack, onNext }: DiagnosisStepProps) {
  const profile = getProfile(answers[0], answers[1]);
  const diagnosis = PAIN_DIAGNOSIS[answers[2]] || PAIN_DIAGNOSIS["Não sei como conduzir a conversa"];
  const tone = answers[3] || "Carinhosa, cheia de amor";

  return (
    <div className="pb-8 pt-3">
      <div className="text-center">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-green-100 text-green-700">
          <Sparkles className="h-7 w-7" />
        </span>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-green-700">
          Seu diagnóstico está pronto
        </p>
        <h2 className="text-3xl font-bold leading-tight text-foreground">
          {diagnosis.title}
        </h2>
      </div>

      <div className="my-6 overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-xl shadow-primary/10">
        <div className="border-b bg-primary/[0.04] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Seu perfil</p>
          <p className="mt-1 text-xl font-bold">{profile}</p>
        </div>
        <div className="grid gap-4 p-5">
          <div className="flex gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-primary">
              <Gauge className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Clientes por semana</p>
              <p className="font-bold">{answers[1]}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-primary">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Onde você mais trava</p>
              <p className="font-bold">{diagnosis.label}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-accent/20 bg-accent/10 p-4 text-sm leading-relaxed">
        <strong>O que pode ajudar:</strong> {diagnosis.insight}
      </div>

      <p className="my-5 text-center text-sm text-muted-foreground">
        Agora veja uma resposta <strong className="text-foreground">{tone.toLowerCase()}</strong> criada para a situação que você escolheu.
      </p>

      <Button onClick={onNext} className="h-16 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
        Ver o DoceZap responder
        <ArrowRight className="h-5 w-5" />
      </Button>
      <button
        type="button"
        onClick={onBack}
        className="mx-auto mt-4 flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Corrigir uma resposta
      </button>
    </div>
  );
}
