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
    content_name: "DoceZap Premium + Kit Atendimento que Rende",
    content_type: "product",
    value: 49.9,
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

type PlanFeature = {
  title: string;
  description?: string;
};

const PLAN_FEATURES: Record<PlanId, PlanFeature[]> = {
  premium: [
    { title: "70 respostas por 30 dias" },
    { title: "Voz mais personalizada para sua confeitaria" },
    { title: "Respostas para desconto, preço, cliente indecisa e pós-orçamento" },
    {
      title: "Combinados da Encomenda",
      description: "Mensagens e checklist para combinar sinal, pagamento restante, alterações, cancelamento, retirada e entrega antes de produzir.",
    },
    {
      title: "Cardápio que Rende",
      description: "Um guia para montar um cardápio claro no celular, com descrição, rendimento, preço, prazo e próximo passo para a cliente pedir.",
    },
    {
      title: "Datas que Rende",
      description: "Um planejamento para escolher datas que combinam com sua produção, definir limite de encomendas, prazos e ideias de divulgação.",
    },
    { title: "Tudo em um só pacote, sem escolher vários adicionais" },
  ],
  basic: [
    { title: "30 respostas por 30 dias" },
    { title: "Tom padrão do DoceZap" },
    { title: "Bom para situações simples" },
    { title: "Acesso pelo navegador" },
    { title: "Pagamento único, sem assinatura automática" },
  ],
};

const PLAN_COMPARISON = [
  { feature: "Respostas para WhatsApp", basic: "30", premium: "70" },
  { feature: "Voz personalizada", basic: "Não", premium: "Sim" },
  { feature: "Situações difíceis de venda", basic: "Básico", premium: "Completo" },
  { feature: "Combinados da Encomenda", basic: "Não", premium: "Sim" },
  { feature: "Cardápio que Rende", basic: "Não", premium: "Sim" },
  { feature: "Datas que Rende", basic: "Não", premium: "Sim" },
  { feature: "Pagamento único", basic: "Sim", premium: "Sim" },
];

const SITUATIONS: Situation[] = [
  {
    id: "discount",
    label: "Cliente pediu desconto",
    customer: "Adorei seu trabalho! Tem como fazer um descontinho?",
    response:
      "Que bom que você gostou! Esse valor já considera ingredientes, tempo e o cuidado para entregar tudo bem feito. Se quiser, posso te mostrar uma opção menor para caber melhor no orçamento sem perder a apresentação.",
    note: "Você revisa, ajusta e copia antes de mandar.",
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
            <div>
              <span className="block text-lg font-bold leading-none">DoceZap</span>
              <span className="text-xs font-bold text-primary/70">respostas melhores no WhatsApp</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="inline-flex rounded-full border border-primary/15 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary shadow-sm">
              Para confeiteiras que vendem pelo WhatsApp
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
              Atenda melhor no WhatsApp da sua confeitaria
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
              O DoceZap te ajuda a responder cliente que pede desconto, acha caro ou some depois do orçamento — e o Premium ainda vem com materiais para organizar cardápio, sinal, confirmação e regras da encomenda sem parecer grossa.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:max-w-md">
            <Button
              onClick={() => goToCheckout("premium", "hero")}
              className="h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
            >
              Comprar Premium + Kit
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

          <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-bold leading-tight text-muted-foreground sm:max-w-md">
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Você revisa antes de enviar</span>
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Não responde sozinho</span>
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Feito para situações reais de venda</span>
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Pagamento único</span>
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
            "Respostas melhores sem perder o carinho",
            "Cardápio e combinados mais claros",
            "Você revisa tudo antes de enviar",
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
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Como funciona</p>
          <h2 className="text-3xl font-bold leading-tight">Veja como funciona antes de comprar.</h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Cole a mensagem difícil da cliente, escolha a situação e receba uma sugestão de resposta para revisar, copiar e mandar pelo WhatsApp.
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
                { icon: MessageCircle, title: "Cole", text: "a mensagem da cliente" },
                { icon: Wand2, title: "Escolha", text: "a situação" },
                { icon: Copy, title: "Revise", text: "e copie a resposta" },
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
          <h2 className="mt-2 text-3xl font-bold leading-tight">Escolha como quer organizar seu atendimento</h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
            O Básico serve para testar o DoceZap. O Premium é para quem quer um kit mais completo para responder, combinar encomendas e deixar o atendimento mais claro.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <PlanCard
            plan="premium"
            title="Premium + Kit Atendimento que Rende"
            eyebrow="Mais indicado"
            price="R$49,90"
            description="Para confeiteiras que atendem clientes todos os dias e querem mais segurança para responder, combinar pedidos e organizar o WhatsApp."
            ctaLabel="Comprar Premium + Kit"
            recommended
            onCheckout={goToCheckout}
          />
          <PlanCard
            plan="basic"
            title="Básico"
            eyebrow="Entrada barata para testar"
            price="R$19,90"
            description="Entrada simples para testar o DoceZap em situações comuns do WhatsApp."
            ctaLabel="Comprar Básico"
            onCheckout={goToCheckout}
          />
        </div>

        <PlanComparison />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white px-5 py-2 shadow-sm">
          <h2 className="pb-1 pt-4 text-center text-xl font-bold">Dúvidas rápidas</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="automatic">
              <AccordionTrigger className="text-left">O DoceZap responde sozinho?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Não. Ele cria uma sugestão de resposta para você revisar, ajustar, copiar e mandar manualmente pelo WhatsApp.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="install">
              <AccordionTrigger className="text-left">Preciso instalar aplicativo?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Não. O acesso é pelo navegador.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="renewal">
              <AccordionTrigger className="text-left">É assinatura?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Não. É pagamento único. O acesso ao DoceZap é por 30 dias conforme o plano escolhido.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="premium">
              <AccordionTrigger className="text-left">O Premium vale mais a pena que o Básico?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Sim, se você atende clientes com frequência. O Básico serve para testar. O Premium vem com mais respostas, voz personalizada e materiais extras para organizar atendimento, cardápio e combinados da encomenda.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="guarantee" className="border-b-0">
              <AccordionTrigger className="text-left">Tem garantia?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Sim. Você tem 7 dias de garantia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="mx-auto max-w-lg px-6 pb-8 text-center text-xs leading-relaxed text-muted-foreground">
        <p>© 2026 DoceZap • Todos os direitos reservados.</p>
        <p className="mt-2">
          O DoceZap ajuda você a preparar respostas e materiais de atendimento. Preço, disponibilidade e combinados continuam sendo confirmados por você.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-background/95 px-4 py-3 shadow-2xl backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-muted-foreground">DoceZap Premium + Kit Atendimento que Rende</p>
            <p className="text-sm font-bold text-foreground">R$49,90</p>
          </div>
          <Button
            onClick={() => goToCheckout("premium", "sticky_cta")}
            className="h-12 shrink-0 rounded-2xl px-5 text-sm font-bold shadow-lg shadow-primary/20"
          >
            Comprar Premium + Kit
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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</p>
        {recommended && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md shadow-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
            Mais indicado
          </div>
        )}
      </div>
      <h3 className="mt-2 text-2xl font-bold leading-tight text-foreground">{title}</h3>

      <div className="mt-5">
        <p className={`text-5xl font-bold ${recommended ? "text-primary" : "text-foreground"}`}>{price}</p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">pagamento único</p>
      </div>

      <p className="mt-4 text-sm font-medium leading-relaxed text-muted-foreground">{description}</p>

      <ul className="mt-5 grid gap-3 text-sm font-medium">
        {PLAN_FEATURES[plan].map((feature) => (
          <li key={feature.title} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
            <span>
              <span className="block">{feature.title}</span>
              {feature.description && (
                <span className="mt-1 block text-xs font-medium leading-relaxed text-muted-foreground">
                  {feature.description}
                </span>
              )}
            </span>
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

function PlanComparison() {
  return (
    <div className="mt-4 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Compare rápido</p>
          <h3 className="mt-1 text-xl font-bold">Básico ou Premium?</h3>
        </div>
        <div className="rounded-2xl bg-green-50 px-3 py-2 text-xs font-bold text-green-800">
          Os dois são pagamento único
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-[1.2fr_0.75fr_0.85fr] gap-2 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          <span>Item</span>
          <span className="text-center">Básico</span>
          <span className="text-center text-primary">Premium</span>
        </div>
        {PLAN_COMPARISON.map((row) => (
          <div
            key={row.feature}
            className="grid grid-cols-[1.2fr_0.75fr_0.85fr] items-center gap-2 rounded-2xl bg-muted/45 px-3 py-3 text-sm font-medium"
          >
            <span className="leading-snug">{row.feature}</span>
            <span className="text-center text-muted-foreground">{row.basic}</span>
            <span className="text-center font-bold text-primary">{row.premium}</span>
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
              <p className="text-sm font-bold">DoceZap</p>
              <p className="text-[11px] text-white/75">respostas melhores no WhatsApp</p>
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
