"use client"

import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCheck, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface ResponseStepProps {
  answers: Record<number, string>;
  onBack: () => void;
  onNext: () => void;
}

const CUSTOMER_MESSAGES: Record<string, string> = {
  "Cliente recebe o preço e some": "Vou conversar aqui em casa e qualquer coisa te aviso 😊",
  "Cliente pede desconto": "Adorei seu trabalho! Tem como fazer um descontinho nesse valor de R$ 120?",
  "Cliente diz que está caro": "Amei o bolo, mas achei um pouco caro 😅",
  "Não sei como conduzir a conversa": "Queria um bolo para sábado. Quanto fica?"
};

const RESPONSES: Record<string, Record<string, string>> = {
  "Cliente recebe o preço e some": {
    "Carinhosa, cheia de amor": "Fica à vontade, querida 💛 Só lembrando que a sexta tá chegando e minha agenda costuma fechar rápido. Quando tiver uma resposta, me chama que eu vejo a data pra você!",
    "Direta e profissional": "Oi! Fica à vontade pra conversar 😊 Só lembrando que a sexta tá chegando e minha agenda fecha rápido. Quando tiver uma resposta, me avisa que eu já separo o dia pra você!",
    "Descontraída e brincalhona": "Combinado 😊 Conversa com calma! Só não esquece que sexta tá pertinho e minha agenda enche rápido. Quando decidir, me chama que eu vejo a data pra você!"
  },
  "Cliente pede desconto": {
    "Carinhosa, cheia de amor": "Entendo, querida 💛 Esse valor de R$ 120 já é o preço justo pra esse pedido feito à mão e sob encomenda só pra você. Não consigo baixar sem mudar o pedido. Se quiser encaixar num valor menor, a gente pode ajustar o tamanho ou o recheio. Quer que eu te mostre uma opção assim?",
    "Direta e profissional": "Esse valor de R$ 120 já é o preço justo pra esse pedido feito à mão e sob encomenda só pra você. Não consigo baixar sem mudar o pedido. Se quiser encaixar num valor menor, a gente pode ajustar o tamanho ou o recheio. Quer que eu te mostre uma opção assim?",
    "Descontraída e brincalhona": "Ah, se eu tivesse um descontinho escondido aqui 😄 Mas R$ 120 já é o preço justo desse pedido, feito à mão e sob encomenda só pra você. Pra chegar num valor menor, dá pra ajustar o tamanho ou o recheio. Quer que eu te mostre uma opção assim?"
  },
  "Cliente diz que está caro": {
    "Carinhosa, cheia de amor": "Entendi, querida 💛 Esse bolo é feito à mão e pensado especialmente para a sua festa. O valor se mantém, mas posso te mostrar uma foto de um que já fiz parecido. Quer ver?",
    "Direta e profissional": "Entendi. Esse bolo é feito à mão e pensado especialmente para a sua festa. O valor se mantém. Quer que eu te mande uma foto de um que já fiz parecido?",
    "Descontraída e brincalhona": "Eu entendo 😄 Esse bolo é feito à mão e vai ser preparado especialmente pra sua festa, então o valor se mantém. Quer que eu te mande uma foto de um parecido que já fiz?"
  },
  "Não sei como conduzir a conversa": {
    "Carinhosa, cheia de amor": "Claro, querida 💛 Para eu calcular certinho, me conta para quantas pessoas seria e qual tema você imaginou. Aí já verifico minha agenda para sábado.",
    "Direta e profissional": "Consigo calcular. Para quantas pessoas será e qual tema você quer? Com isso, confirmo o valor e verifico se ainda tenho vaga no sábado.",
    "Descontraída e brincalhona": "Bora montar esse bolo! 😊 Me conta para quantas pessoas e qual tema você quer. Aí eu calculo certinho e vejo se ainda tenho vaga no sábado."
  }
};

const WHY_IT_WORKS: Record<string, string> = {
  "Cliente recebe o preço e some": "Retoma a conversa sem pressionar e lembra a cliente de confirmar a data.",
  "Cliente pede desconto": "Mantém o preço e oferece uma opção menor sem desvalorizar o seu trabalho.",
  "Cliente diz que está caro": "Explica o valor do artesanal e mostra uma prova concreta do seu trabalho.",
  "Não sei como conduzir a conversa": "Pede só as informações necessárias para calcular e continuar o atendimento."
};

export function ResponseStep({ answers, onBack, onNext }: ResponseStepProps) {
  const pain = CUSTOMER_MESSAGES[answers[2]] ? answers[2] : "Cliente diz que está caro";
  const toneOptions = RESPONSES[pain];
  const tone = toneOptions[answers[3]] ? answers[3] : "Carinhosa, cheia de amor";
  const customerMessage = CUSTOMER_MESSAGES[pain];
  const response = toneOptions[tone];

  useEffect(() => {
    trackEvent("personalized_response_viewed", {
      situation: pain,
      tone,
    });
  }, [pain, tone]);

  const handleContinue = () => {
    trackEvent("personalized_response_continued", {
      situation: pain,
      tone,
    });
    onNext();
  };

  return (
    <div className="space-y-6 pb-8 pt-3">
      <div className="text-center">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="h-7 w-7" />
        </span>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          No estilo que você escolheu
        </p>
        <h2 className="text-3xl font-bold leading-tight">
          Uma resposta {tone.toLowerCase()} para essa cliente
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-xl shadow-primary/10">
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-xs font-bold">DZ</span>
          <div>
            <p className="text-sm font-bold">Atendimento da sua confeitaria</p>
            <p className="text-[11px] text-white/75">online</p>
          </div>
        </div>

        <div className="chat-surface min-h-[330px] space-y-4 p-4">
          <div className="flex justify-start">
            <div className="chat-bubble-tail-client relative max-w-[86%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
              <p>{customerMessage}</p>
              <span className="mt-1 block text-right text-[10px] text-foreground/45">14:32</span>
            </div>
          </div>

          <div className="flex justify-end animate-fade-in">
            <div className="chat-bubble-tail-agent relative max-w-[90%] rounded-2xl rounded-tr-sm bg-[#D9FDD3] p-3 text-sm text-[#173404] shadow-sm">
              <p className="leading-relaxed">{response}</p>
              <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-green-900/50">
                14:33 <CheckCheck className="h-3 w-3 text-blue-500" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 rounded-2xl border border-accent/20 bg-accent/10 p-4 text-sm leading-relaxed">
        <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <p><strong>Por que funciona:</strong> {WHY_IT_WORKS[pain]}</p>
      </div>

      <Button
        onClick={handleContinue}
        className="h-16 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
      >
        Ver uma confeiteira usando na prática
        <ArrowRight className="h-5 w-5" />
      </Button>

      <button
        type="button"
        onClick={onBack}
        className="mx-auto flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao diagnóstico
      </button>
    </div>
  );
}
