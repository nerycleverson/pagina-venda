"use client"

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Check, CheckCheck, Copy, Loader2, MessageCircle, PlayCircle, Smartphone, Sparkles, Volume2 } from 'lucide-react';
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

const STATUS_LABELS: Record<string, string> = {
  "Cliente recebe o preço e some": "Cliente sumiu depois do preço",
  "Cliente pede desconto": "Pedido de desconto",
  "Cliente diz que está caro": "Objeção de preço",
  "Não sei como conduzir a conversa": "Pedido incompleto"
};

const VIDEO_SRC = "/videos/demonstracao-docezap.mp4";

export function ResponseStep({ answers, onBack, onNext }: ResponseStepProps) {
  const pain = CUSTOMER_MESSAGES[answers[2]] ? answers[2] : "Cliente diz que está caro";
  const toneOptions = RESPONSES[pain];
  const tone = toneOptions[answers[3]] ? answers[3] : "Carinhosa, cheia de amor";
  const customerMessage = CUSTOMER_MESSAGES[pain];
  const response = toneOptions[tone];
  const [isResponseReady, setIsResponseReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const progressMilestones = useRef(new Set<number>());

  useEffect(() => {
    setIsResponseReady(false);
    setCopied(false);
    setShowDemo(false);
    setVideoError(false);
    setVideoStarted(false);
    progressMilestones.current.clear();
    trackEvent("personalized_response_viewed", {
      situation: pain,
      tone,
    });

    const timer = window.setTimeout(() => {
      setIsResponseReady(true);
      trackEvent("personalized_response_generated", {
        situation: pain,
        tone,
      });
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [pain, tone]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      trackEvent("personalized_response_copied", {
        situation: pain,
        tone,
      });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      trackEvent("personalized_response_copy_failed", {
        situation: pain,
        tone,
      });
    }
  };

  const handleContinue = () => {
    if (!isResponseReady) return;
    trackEvent("personalized_response_continued", {
      situation: pain,
      tone,
    });
    onNext();
  };

  const handleOpenDemo = () => {
    const nextValue = !showDemo;
    setShowDemo(nextValue);

    if (nextValue) {
      trackEvent("demo_optional_opened", {
        source: "personalized_response",
      });
    }
  };

  const handleVideoPlay = () => {
    if (videoStarted) return;
    setVideoStarted(true);
    trackEvent("demo_video_started", {
      source: "personalized_response",
    });
  };

  const handleVideoTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (!video.duration) return;

    const progress = (video.currentTime / video.duration) * 100;
    [25, 50, 75].forEach((milestone) => {
      if (progress >= milestone && !progressMilestones.current.has(milestone)) {
        progressMilestones.current.add(milestone);
        trackEvent("demo_video_progress", {
          source: "personalized_response",
          percent: milestone,
        });
      }
    });
  };

  const handleVideoEnded = () => {
    trackEvent("demo_video_completed", {
      source: "personalized_response",
    });
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
          Veja o DoceZap preparando a resposta
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-xl shadow-primary/10">
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-xs font-bold">DZ</span>
          <div>
            <p className="text-sm font-bold">DoceZap IA</p>
            <p className="text-[11px] text-white/75">
              {isResponseReady ? "resposta pronta para copiar" : "preparando uma resposta personalizada"}
            </p>
          </div>
        </div>

        <div className="chat-surface min-h-[430px] space-y-4 p-4">
          <div className="rounded-2xl border border-white/70 bg-white/90 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Gerador de respostas</p>
                <p className="text-sm font-bold leading-tight">Resposta no tom {tone.toLowerCase()}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-bold text-muted-foreground">
              <span className="rounded-full bg-muted/70 px-3 py-1.5">{STATUS_LABELS[pain]}</span>
              <span className="rounded-full bg-muted/70 px-3 py-1.5">Bolo sob encomenda</span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="chat-bubble-tail-client relative max-w-[86%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
              <p>{customerMessage}</p>
              <span className="mt-1 block text-right text-[10px] text-foreground/45">14:32</span>
            </div>
          </div>

          {!isResponseReady ? (
            <div className="flex justify-end animate-fade-in">
              <div className="relative max-w-[90%] rounded-2xl rounded-tr-sm bg-white p-3 text-sm shadow-sm">
                <div className="flex items-center gap-2 font-bold text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>DoceZap está escrevendo...</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Analisando a situação, o produto e o seu jeito de falar.</p>
                <div className="mt-3 space-y-2">
                  <span className="block h-2 w-full animate-pulse rounded-full bg-primary/15" />
                  <span className="block h-2 w-10/12 animate-pulse rounded-full bg-primary/10" />
                  <span className="block h-2 w-7/12 animate-pulse rounded-full bg-primary/10" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end animate-fade-in">
              <div className="chat-bubble-tail-agent relative max-w-[90%] rounded-2xl rounded-tr-sm bg-[#D9FDD3] p-3 text-sm text-[#173404] shadow-sm">
                <p className="leading-relaxed">{response}</p>
                <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-green-900/50">
                  14:33 <CheckCheck className="h-3 w-3 text-blue-500" />
                </span>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-green-900/10 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-green-900/55">Pronta para WhatsApp</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-xs font-bold text-green-900 transition-colors hover:bg-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copiada" : "Copiar"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isResponseReady && (
        <div className="flex gap-3 rounded-2xl border border-accent/20 bg-accent/10 p-4 text-sm leading-relaxed animate-fade-in">
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p><strong>Por que funciona:</strong> {WHY_IT_WORKS[pain]}</p>
        </div>
      )}

      <Button
        onClick={handleContinue}
        disabled={!isResponseReady}
        className="h-16 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 disabled:cursor-wait disabled:opacity-70"
      >
        {isResponseReady ? (
          <>
            Ver meu plano recomendado
            <ArrowRight className="h-5 w-5" />
          </>
        ) : (
          <>
            Preparando resposta
            <Loader2 className="h-5 w-5 animate-spin" />
          </>
        )}
      </Button>

      {isResponseReady && (
        <div className="rounded-3xl border border-primary/10 bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={handleOpenDemo}
            className="flex w-full items-center gap-3 rounded-2xl bg-primary/[0.04] p-3 text-left transition-colors hover:bg-primary/[0.07]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-sm">
              <PlayCircle className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-foreground">
                Ver uma confeiteira usando o DoceZap
              </span>
              <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                Vídeo curto com a tela do produto antes de escolher o plano.
              </span>
            </span>
          </button>

          {showDemo && (
            <div className="mt-4 space-y-4 animate-fade-in">
              <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[28px] border-[6px] border-foreground bg-foreground shadow-2xl shadow-primary/20">
                <div className="aspect-[9/16] w-full bg-[#171717]">
                  {videoError ? (
                    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-white">
                      <PlayCircle className="h-14 w-14 text-white/70" />
                      <div>
                        <p className="font-bold">Vídeo demonstrativo</p>
                        <p className="mt-2 text-xs leading-relaxed text-white/60">
                          Demonstração do DoceZap em uso no atendimento.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <video
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      poster="/videos/capa-demonstracao.jpg"
                      onPlay={handleVideoPlay}
                      onTimeUpdate={handleVideoTimeUpdate}
                      onEnded={handleVideoEnded}
                      onError={() => setVideoError(true)}
                      aria-label="Demonstração do DoceZap por uma confeiteira"
                    >
                      <source src={VIDEO_SRC} type="video/mp4" />
                      Seu navegador não consegue reproduzir este vídeo.
                    </video>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: BadgeCheck, text: "Uso real" },
                  { icon: Smartphone, text: "Mostra a tela" },
                  { icon: Volume2, text: "Explicação curta" }
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="rounded-2xl border bg-white p-3 text-center shadow-sm">
                    <Icon className="mx-auto mb-2 h-4 w-4 text-primary" />
                    <p className="text-[11px] font-bold leading-tight">{text}</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleContinue}
                className="h-14 w-full rounded-2xl text-base font-bold shadow-lg shadow-primary/20"
              >
                Gostei, ver meu plano recomendado
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      )}

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
