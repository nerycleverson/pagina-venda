"use client"

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  MessageCircle,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackEvent, trackTikTokEvent } from "@/lib/analytics";

type SituationId = "discount" | "expensive" | "ghosted";

type Situation = {
  id: SituationId;
  label: string;
  customer: string;
  response: string;
  note: string;
};

const CHECKOUT_LINKS = {
  premium: "https://checkout.chocolaterende.com/VCCL1O8SD38E",
  basic: "https://checkout.chocolaterende.com/VCCL1O8SD38D",
} as const;
const VIDEO_SRC = "/videos/demonstracao-docezap.mp4";

const PRODUCTS = {
  premium: {
    content_id: "VCCL1O8SD38E",
    content_name: "DoceZap Premium - 70 respostas",
    content_type: "product",
    value: 29.9,
    currency: "BRL",
    quantity: 1,
  },
  basic: {
    content_id: "VCCL1O8SD38D",
    content_name: "DoceZap Básico - 30 respostas",
    content_type: "product",
    value: 19.9,
    currency: "BRL",
    quantity: 1,
  },
} as const;

type PlanId = keyof typeof CHECKOUT_LINKS;

const SHARED_PLAN_FEATURES = [
  "As mesmas 9 situações principais do DoceZap",
  "Funciona para orçamento, desconto, preço, indecisão e pós-venda",
  "Você revisa, ajusta e envia manualmente pelo WhatsApp",
  "Acesso pelo navegador, sem instalar aplicativo",
];

const PLAN_FEATURES: Record<PlanId, string[]> = {
  premium: [
    "70 respostas para usar em 30 dias",
    "Voz personalizada da sua confeitaria",
    "Mais folga para quem atende clientes todos os dias",
    "Melhor custo por resposta",
  ],
  basic: [
    "30 respostas para usar em 30 dias",
    "Tom caloroso padrão do DoceZap",
    "Bom para testar na rotina sem gastar muito",
    "Pagamento único, sem assinatura automática",
  ],
};

const SITUATIONS: Situation[] = [
  {
    id: "discount",
    label: "Cliente pediu desconto",
    customer: "Adorei seu trabalho! Tem como fazer um descontinho?",
    response:
      "Que bom que você amou! 🥰 Esse valor de R$ 120 já é o preço justo pelo que esse pedido exige: ingredientes, tempo e tudo feito sob encomenda só pra você. Não tem margem pra cortar sem comprometer o resultado. Se quiser encaixar num valor menor, a gente pode ajustar o tamanho ou o recheio, me fala o que prefere e eu te mostro uma opção.",
    note: "Mantém seu preço sem soar grossa.",
  },
  {
    id: "expensive",
    label: "Cliente achou caro",
    customer: "Amei o bolo, mas achei um pouco caro.",
    response:
      "Entendi! Esse bolo de chocolate é feito à mão, exclusivo pra você, bem diferente de qualquer coisa pronta por aí. O valor de R$180 se mantém, sim. Quer que eu te mande uma foto de um que já fiz parecido?",
    note: "Explica valor e conduz o próximo passo.",
  },
  {
    id: "ghosted",
    label: "Cliente sumiu",
    customer: "Vou ver aqui e qualquer coisa te aviso.",
    response:
      "Combinado 😊 Só lembrando que minha agenda fecha rápido. Se quiser garantir a data, me chama que eu vejo a melhor forma para você.",
    note: "Retoma a conversa sem pressionar.",
  },
];

export function DemoLanding() {
  const [selectedId, setSelectedId] = useState<SituationId>("discount");
  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const selected = SITUATIONS.find((item) => item.id === selectedId) || SITUATIONS[0];

  useEffect(() => {
    trackEvent("landing_demo_viewed");
    trackEvent("offer_viewed", {
      recommended_plan: "premium",
      source: "demo_landing",
    });
    trackTikTokEvent("ViewContent", PRODUCTS.premium);
  }, []);

  useEffect(() => {
    setIsGenerating(true);
    setCopied(false);
    const timer = window.setTimeout(() => {
      setIsGenerating(false);
      trackEvent("demo_response_generated", {
        situation: selectedId,
      });
    }, 900);

    return () => window.clearTimeout(timer);
  }, [selectedId]);

  const chooseSituation = (id: SituationId) => {
    setSelectedId(id);
    trackEvent("demo_situation_selected", { situation: id });
  };

  const generateAgain = () => {
    setIsGenerating(true);
    setCopied(false);
    trackEvent("demo_generate_clicked", { situation: selectedId });
    window.setTimeout(() => setIsGenerating(false), 850);
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(selected.response);
      setCopied(true);
      trackEvent("demo_response_copied", { situation: selectedId });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      trackEvent("demo_response_copy_failed", { situation: selectedId });
    }
  };

  const goToCheckout = (plan: PlanId, source: string) => {
    trackEvent("checkout_clicked", { plan, source });
    trackTikTokEvent("InitiateCheckout", PRODUCTS[plan]);
    window.location.href = CHECKOUT_LINKS[plan];
  };

  const toggleVideo = () => {
    const nextValue = !showVideo;
    setShowVideo(nextValue);
    if (nextValue) {
      trackEvent("demo_video_opened", { source: "demo_landing" });
    }
  };

  return (
    <main className="min-h-screen pb-24 text-foreground">
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-10 pt-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-14 lg:pt-10">
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-primary">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">DoceZap IA</span>
          </div>

          <div className="space-y-4">
            <p className="inline-flex rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary shadow-sm">
              Para confeiteiras que vendem pelo WhatsApp
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
              Cliente pediu desconto ou disse que está caro?
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
              O DoceZap cria uma resposta pronta para você revisar, copiar e mandar.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:max-w-md">
            <Button
              onClick={() => goToCheckout("premium", "hero")}
              className="h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
            >
              Comprar Premium
              <ArrowRight className="h-5 w-5" />
            </Button>
            <button
              type="button"
              onClick={generateAgain}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-primary/25 bg-white/80 px-5 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
            >
              <Wand2 className="h-4 w-4" />
              Ver uma resposta agora
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold leading-tight text-muted-foreground sm:max-w-md">
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Premium R$29,90</span>
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Básico R$19,90</span>
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Garantia 7 dias</span>
          </div>
        </div>

        <DemoPanel
          selected={selected}
          selectedId={selectedId}
          isGenerating={isGenerating}
          copied={copied}
          onChoose={chooseSituation}
          onCopy={copyResponse}
          onGenerate={generateAgain}
          resultRef={resultRef}
        />
      </section>

      <section className="border-y border-primary/10 bg-white/65">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-5 sm:grid-cols-3 sm:px-6">
          {[
            "Respostas firmes sem perder o carinho",
            "Texto pronto para copiar no WhatsApp",
            "Você revisa antes de enviar",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-700" />
              <p className="text-sm font-bold leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-9 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Prova rápida</p>
          <h2 className="text-3xl font-bold leading-tight">Veja antes de comprar.</h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Um vídeo curto mostra a ferramenta na prática. Se já entendeu, o botão de compra continua logo abaixo.
          </p>
          <Button
            variant="outline"
            onClick={toggleVideo}
            className="h-12 rounded-2xl border-2 border-primary/30 bg-white font-bold text-primary hover:bg-primary/5 hover:text-primary"
          >
            <PlayCircle className="h-5 w-5" />
            {showVideo ? "Fechar vídeo" : "Ver uma confeiteira usando"}
          </Button>
        </div>

        <div className="rounded-3xl border border-primary/10 bg-white p-4 shadow-xl shadow-primary/10">
          {showVideo ? (
            <div className="mx-auto max-w-[280px] overflow-hidden rounded-[28px] border-[6px] border-foreground bg-foreground">
              <div className="aspect-[9/16] bg-[#171717]">
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/videos/capa-demonstracao.jpg"
                  aria-label="Demonstração do DoceZap"
                >
                  <source src={VIDEO_SRC} type="video/mp4" />
                  Seu navegador não consegue reproduzir este vídeo.
                </video>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: MessageCircle, title: "Cole", text: "a mensagem difícil" },
                { icon: Wand2, title: "Gere", text: "uma resposta pronta" },
                { icon: Copy, title: "Copie", text: "e envie manualmente" },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl bg-muted/55 p-4 text-center">
                  <Icon className="mx-auto mb-3 h-6 w-6 text-primary" />
                  <p className="font-bold">{title}</p>
                  <p className="mt-1 text-xs font-medium leading-snug text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="planos" className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <div className="mx-auto mb-5 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Escolha seu pacote</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight">Premium para ter mais folga. Básico para começar.</h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
            Os dois cobrem as principais conversas de venda. A diferença é quantidade de respostas, personalização e ritmo de uso.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <PlanCard
            plan="premium"
            title="Premium"
            eyebrow="Mais vendido para quem atende todo dia"
            price="R$29,90"
            description="70 respostas por 30 dias, com voz personalizada para soar mais parecido com você."
            ctaLabel="Comprar Premium"
            recommended
            onCheckout={goToCheckout}
          />
          <PlanCard
            plan="basic"
            title="Básico"
            eyebrow="Entrada barata para testar"
            price="R$19,90"
            description="30 respostas por 30 dias, com o tom caloroso padrão do DoceZap."
            ctaLabel="Comprar Básico"
            onCheckout={goToCheckout}
          />
        </div>

        <div className="mt-4 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">Nos dois pacotes</p>
          <div className="grid gap-3 text-sm font-medium sm:grid-cols-2">
            {SHARED_PLAN_FEATURES.map((text) => (
              <div key={text} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 text-center text-[11px] font-bold leading-tight text-muted-foreground">
            <span className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-green-700" />
              Checkout seguro
            </span>
            <span className="flex flex-col items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-green-700" />
              Acesso por e-mail
            </span>
            <span className="flex flex-col items-center gap-1.5">
              <RotateCcw className="h-4 w-4 text-green-700" />
              Garantia 7 dias
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white px-5 py-2 shadow-sm">
          <h2 className="pb-1 pt-4 text-center text-xl font-bold">Dúvidas rápidas</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="automatic">
              <AccordionTrigger className="text-left">O DoceZap responde sozinho?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Não. Ele cria a resposta e você revisa, copia e envia manualmente pelo WhatsApp.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="install">
              <AccordionTrigger className="text-left">Preciso instalar aplicativo?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Não. Você usa pelo navegador do celular ou computador.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="renewal">
              <AccordionTrigger className="text-left">É assinatura?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Não. É pagamento único, com acesso por 30 dias. Não renova sozinho.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="guarantee" className="border-b-0">
              <AccordionTrigger className="text-left">Tem garantia?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Sim. Você tem 7 dias para testar e pedir reembolso se não fizer sentido para você.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="mx-auto max-w-lg px-6 pb-8 text-center text-xs leading-relaxed text-muted-foreground">
        <p>© 2026 DoceZap IA • Todos os direitos reservados.</p>
        <p className="mt-2">
          O DoceZap IA é um assistente de escrita. Preço, disponibilidade e políticas continuam sendo confirmados por você.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-background/95 px-4 py-3 shadow-2xl backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-muted-foreground">DoceZap Premium</p>
            <p className="text-sm font-bold text-foreground">R$29,90 • 70 respostas</p>
          </div>
          <Button
            onClick={() => goToCheckout("premium", "sticky_cta")}
            className="h-12 shrink-0 rounded-2xl px-5 text-sm font-bold shadow-lg shadow-primary/20"
          >
            Comprar Premium
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}

function PlanCard({
  plan,
  title,
  eyebrow,
  price,
  description,
  ctaLabel,
  recommended = false,
  onCheckout,
}: {
  plan: PlanId;
  title: string;
  eyebrow: string;
  price: string;
  description: string;
  ctaLabel: string;
  recommended?: boolean;
  onCheckout: (plan: PlanId, source: string) => void;
}) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ${
        recommended
          ? "border-2 border-primary shadow-2xl shadow-primary/15"
          : "border border-primary/10"
      }`}
    >
      {recommended && (
        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md shadow-primary/20">
          <Sparkles className="h-3.5 w-3.5" />
          Recomendado
        </div>
      )}

      <div className={recommended ? "pr-24" : ""}>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-bold text-foreground">{title}</h3>
      </div>

      <div className="mt-5">
        <p className={`text-5xl font-bold ${recommended ? "text-primary" : "text-foreground"}`}>{price}</p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">pagamento único</p>
      </div>

      <p className="mt-4 text-sm font-medium leading-relaxed text-muted-foreground">{description}</p>

      <ul className="mt-5 grid gap-3 text-sm font-medium">
        {PLAN_FEATURES[plan].map((text) => (
          <li key={text} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={recommended ? "default" : "outline"}
        onClick={() => onCheckout(plan, `${plan}_card`)}
        className={`mt-6 h-14 w-full rounded-2xl text-base font-bold ${
          recommended
            ? "shadow-xl shadow-primary/20"
            : "border-2 border-primary/25 bg-white text-primary hover:bg-primary/5 hover:text-primary"
        }`}
      >
        {ctaLabel}
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}

function DemoPanel({
  selected,
  selectedId,
  isGenerating,
  copied,
  onChoose,
  onCopy,
  onGenerate,
  resultRef,
}: {
  selected: Situation;
  selectedId: SituationId;
  isGenerating: boolean;
  copied: boolean;
  onChoose: (id: SituationId) => void;
  onCopy: () => void;
  onGenerate: () => void;
  resultRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="rounded-[28px] border border-primary/10 bg-white p-3 shadow-2xl shadow-primary/15 sm:p-4">
      <div className="overflow-hidden rounded-[24px] border border-[#d7e9d7] bg-[#f3f8f0]">
        <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-xs font-bold">DZ</span>
            <div>
              <p className="text-sm font-bold">DoceZap IA</p>
              <p className="text-[11px] text-white/75">resposta pronta para WhatsApp</p>
            </div>
          </div>
          <Sparkles className="h-5 w-5 text-white/80" />
        </div>

        <div className="chat-surface space-y-4 p-4">
          <div className="rounded-2xl bg-white/95 p-3 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
              Escolha uma situação
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {SITUATIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChoose(item.id)}
                  className={`rounded-2xl border px-3 py-2 text-left text-xs font-bold leading-tight transition-colors ${
                    selectedId === item.id
                      ? "border-primary bg-primary text-white"
                      : "border-primary/10 bg-white text-foreground hover:border-primary/30"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-start">
            <div className="chat-bubble-tail-client relative max-w-[86%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
              <p>{selected.customer}</p>
              <span className="mt-1 block text-right text-[10px] text-foreground/45">14:32</span>
            </div>
          </div>

          <div ref={resultRef} className="flex justify-end">
            <div className="chat-bubble-tail-agent relative max-w-[90%] rounded-2xl rounded-tr-sm bg-[#D9FDD3] p-3 text-sm text-[#173404] shadow-sm">
              {isGenerating ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    DoceZap está escrevendo...
                  </div>
                  <div className="space-y-2">
                    <span className="block h-2 w-full animate-pulse rounded-full bg-green-900/15" />
                    <span className="block h-2 w-10/12 animate-pulse rounded-full bg-green-900/10" />
                    <span className="block h-2 w-7/12 animate-pulse rounded-full bg-green-900/10" />
                  </div>
                </div>
              ) : (
                <>
                  <p className="leading-relaxed">{selected.response}</p>
                  <span className="mt-1 block text-right text-[10px] text-green-900/50">14:33 ✓✓</span>
                  <div className="mt-3 rounded-xl bg-white/65 p-2 text-xs font-bold text-green-900/75">
                    {selected.note}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={onCopy}
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-bold text-green-900"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copiada" : "Copiar"}
                    </button>
                    <button
                      type="button"
                      onClick={onGenerate}
                      className="inline-flex items-center justify-center rounded-xl bg-white/70 px-3 py-2 text-xs font-bold text-green-900"
                      aria-label="Gerar novamente"
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
