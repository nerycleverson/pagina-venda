"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  LayoutTemplate,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  buildCheckoutUrlWithCurrentParams,
  trackEvent,
  trackInitiateCheckout,
  trackTikTokEvent,
} from "@/lib/analytics";

const CHECKOUT_LINKS = {
  premium: "https://checkout.chocolaterende.com/VCCL1O8SD38E",
  basic: "https://checkout.chocolaterende.com/VCCL1O8SD38D",
} as const;

const CHECKOUT_REDIRECT_DELAY_MS = 400;
const VIDEO_SRC = "/videos/demonstracao-docezap.mp4";

const PRODUCTS = {
  premium: {
    content_id: "VCCL1O8SD38E",
    content_name: "Kit WhatsApp da Confeitaria",
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

const KIT_FEATURES = [
  "DoceZap Premium por 30 dias",
  "70 respostas melhores para WhatsApp",
  "Voz mais personalizada para sua confeitaria",
  "Combinados da Encomenda",
  "Cardápio que Rende",
  "Datas que Rende como material complementar",
  "Pagamento único, sem assinatura automática",
];

const PRODUCT_PROOFS = [
  {
    src: "/provas/docezap-cardapio.png",
    label: "Cardápio que Rende",
    title: "Um modelo para apresentar produto, rendimento, preço e prazo.",
    alt: "Tela real do Cardápio que Rende com modelo de descrição de bolo",
  },
  {
    src: "/provas/docezap-responder.png",
    label: "DoceZap Premium",
    title: "Situações de atendimento para você escolher antes de gerar.",
    alt: "Tela real do Respondedor DoceZap com situações comuns de atendimento",
  },
  {
    src: "/provas/docezap-combinados.png",
    label: "Combinados da Encomenda",
    title: "Checklist para conferir os detalhes antes de produzir.",
    alt: "Tela real dos Combinados da Encomenda com checklist do pedido",
  },
  {
    src: "/provas/docezap-datas.png",
    label: "Datas que Rende",
    title: "Planejamento de produção para campanhas como a Páscoa.",
    alt: "Tela real do Datas que Rende com planejamento para a Páscoa",
  },
] as const;

export function DemoLanding() {
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    trackEvent("landing_demo_viewed");
    trackEvent("offer_viewed", {
      recommended_plan: "premium",
      source: "demo_landing",
    });
    trackTikTokEvent("ViewContent", PRODUCTS.premium);
  }, []);

  const goToCheckout = (plan: PlanId, source: string) => {
    trackInitiateCheckout(plan);
    trackEvent("checkout_clicked", { plan, source });
    trackTikTokEvent("InitiateCheckout", PRODUCTS[plan]);
    const checkoutUrl = buildCheckoutUrlWithCurrentParams(CHECKOUT_LINKS[plan]);

    window.setTimeout(() => {
      window.location.href = checkoutUrl;
    }, CHECKOUT_REDIRECT_DELAY_MS);
  };

  const handleVideoPlay = () => {
    if (videoStarted) return;
    setVideoStarted(true);
    trackEvent("demo_video_opened", { source: "demo_landing" });
  };

  return (
    <main className="min-h-screen overflow-x-hidden pb-24 text-foreground">
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-12 pt-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-12">
        <div className="min-w-0 space-y-5">
          <div className="flex items-center gap-2 text-primary">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <span className="block text-lg font-bold leading-none">Kit WhatsApp da Confeitaria</span>
              <span className="text-xs font-bold text-primary/70">do cardápio aos combinados da encomenda</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="inline-flex max-w-full rounded-full border border-primary/15 bg-white/75 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
              Ela abriu seu cardápio e disse: “vou olhar e te aviso”?
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
              Seu cardápio não precisa terminar com a cliente sumindo.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              O Kit ajuda você a mostrar as opções com mais clareza, responder quando a conversa trava e deixar os combinados da encomenda organizados.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:max-w-md">
            <Button
              type="button"
              onClick={() => goToCheckout("premium", "hero")}
              className="h-16 whitespace-normal rounded-2xl px-4 text-lg font-bold leading-tight shadow-xl shadow-primary/20"
            >
              Quero o Kit por R$49,90
              <ArrowRight className="h-5 w-5" />
            </Button>
            <a
              href="#o-que-vem"
              className="flex h-12 items-center justify-center rounded-2xl border-2 border-primary/20 bg-white/80 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
            >
              Ver o que vem no Kit
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold leading-tight text-muted-foreground sm:max-w-lg">
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Pagamento único</span>
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">DoceZap por 30 dias</span>
            <span className="rounded-2xl bg-white/80 px-2 py-3 shadow-sm">Garantia de 7 dias</span>
          </div>
        </div>

        <KitJourneyPreview />
      </section>

      <section className="border-y border-primary/10 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Telas reais do Kit</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight">Veja o que você encontra depois que entra.</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Estas imagens foram tiradas da área de membros. Você acessa pelo navegador e avança pelos conteúdos parte por parte.
            </p>
            <p className="mt-3 text-xs font-bold text-primary md:hidden">Deslize para ver as quatro telas</p>
          </div>

          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
            {PRODUCT_PROOFS.map((proof) => (
              <article key={proof.src} className="min-w-[88%] snap-center overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-lg shadow-primary/5 md:min-w-0">
                <div className="relative aspect-[71/60] overflow-hidden border-b border-primary/10 bg-[#f7f0eb]">
                  <Image
                    src={proof.src}
                    alt={proof.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{proof.label}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{proof.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Um pedido pode travar em três momentos</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight">O Kit acompanha a conversa do começo ao combinado.</h2>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <JourneyCard
              number="1"
              title="Antes do orçamento"
              text="A cliente precisa entender as opções, o rendimento, o prazo e como pedir."
              product="Cardápio que Rende"
              icon={LayoutTemplate}
            />
            <JourneyCard
              number="2"
              title="Quando a conversa trava"
              text="Desconto, preço, pedido incompleto ou aquele ‘vou olhar e te aviso’."
              product="DoceZap"
              icon={MessageCircle}
            />
            <JourneyCard
              number="3"
              title="Depois que ela decide"
              text="Sinal, alterações, prazo, retirada e entrega precisam ficar claros."
              product="Combinados da Encomenda"
              icon={ClipboardCheck}
            />
          </div>
        </div>
      </section>

      <section id="o-que-vem" className="scroll-mt-6 mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">O que você recebe</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight">Não são só nomes de materiais. Cada parte entra em um momento do pedido.</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Veja a estrutura de cada item e como ela ajuda no atendimento. Você adapta as informações à sua confeitaria.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <MaterialCard
            icon={LayoutTemplate}
            eyebrow="Antes da conversa"
            title="Cardápio que Rende"
            description="Um guia para deixar o cardápio mais fácil de entender no celular."
            items={["Descrição do produto", "Rendimento e preço", "Prazo e próximo passo"]}
          />
          <MaterialCard
            icon={Wand2}
            eyebrow="Durante a conversa"
            title="DoceZap Premium"
            description="Você informa a situação, revisa a sugestão e copia antes de enviar."
            items={["70 respostas em 30 dias", "Voz mais personalizada", "Situações comuns de confeitaria"]}
            featured
          />
          <MaterialCard
            icon={ClipboardCheck}
            eyebrow="Depois da decisão"
            title="Combinados da Encomenda"
            description="Mensagens e checklist para confirmar o pedido antes de produzir."
            items={["Sinal e pagamento", "Alterações e cancelamento", "Retirada e entrega"]}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <CalendarDays className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <p className="font-bold">Datas que Rende também está incluído</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Material complementar para planejar datas, limites de encomendas, prazos e divulgação sem comprometer sua produção.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Por que não é só pedir uma resposta genérica?</p>
            <h2 className="text-3xl font-bold leading-tight">Você não precisa começar do zero nem saber montar um prompt toda vez.</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              O DoceZap foi pensado para situações de atendimento da confeitaria. Você informa o que sabe, recebe uma sugestão e continua no controle antes de mandar.
            </p>

            <ul className="space-y-3">
              {[
                "Escolha a situação que está acontecendo no WhatsApp.",
                "Ajuste a resposta ao seu produto e ao seu jeito de falar.",
                "Revise, copie e envie manualmente para a cliente.",
                "Preço, prazo, Pix e disponibilidade continuam sendo confirmados por você.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <span className="text-sm font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <DoceZapExample />
        </div>
      </section>

      <section id="demonstracao" className="mx-auto grid max-w-5xl gap-7 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
            <PlayCircle className="h-4 w-4" />
            Demonstração real
          </span>
          <h2 className="text-3xl font-bold leading-tight">Veja uma confeiteira usando o DoceZap.</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            O vídeo mostra a ferramenta em uso. A mensagem não é enviada sozinha: a confeiteira confere o texto antes de copiar e mandar pelo WhatsApp.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-bold text-muted-foreground">
            <span className="rounded-full bg-white px-3 py-2 shadow-sm">Uso pelo navegador</span>
            <span className="rounded-full bg-white px-3 py-2 shadow-sm">Revisão antes de enviar</span>
            <span className="rounded-full bg-white px-3 py-2 shadow-sm">Sem resposta automática</span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[290px] overflow-hidden rounded-[30px] border-[7px] border-foreground bg-foreground shadow-2xl shadow-primary/20">
          <div className="aspect-[9/16] bg-[#171717]">
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/videos/capa-demonstracao.jpg"
              onPlay={handleVideoPlay}
              aria-label="Demonstração do DoceZap por uma confeiteira"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Seu navegador não consegue reproduzir este vídeo.
            </video>
          </div>
        </div>
      </section>

      <section id="oferta" className="border-y border-primary/10 bg-primary/[0.045]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Kit WhatsApp da Confeitaria</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight">Deixe o pedido mais claro do cardápio aos combinados.</h2>
          </div>

          <div className="mx-auto mt-7 max-w-2xl overflow-hidden rounded-[30px] border-2 border-primary bg-white shadow-2xl shadow-primary/15">
            <div className="flex flex-col gap-2 bg-primary px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
              <span className="font-bold">Kit completo</span>
              <span className="text-xs font-bold">Pagamento único</span>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              <div>
                <p className="text-sm font-bold text-muted-foreground">Tudo por</p>
                <p className="mt-1 text-5xl font-bold text-primary">R$49,90</p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {KIT_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                    <span className="text-sm font-medium leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                onClick={() => goToCheckout("premium", "main_offer")}
                className="h-16 w-full whitespace-normal rounded-2xl px-4 text-lg font-bold leading-tight shadow-xl shadow-primary/20"
              >
                Quero o Kit por R$49,90
                <ArrowRight className="h-5 w-5" />
              </Button>

              <div className="grid grid-cols-3 gap-2 border-t pt-5 text-center text-[10px] font-bold leading-tight text-muted-foreground sm:text-xs">
                <span className="flex flex-col items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-700" />Garantia de 7 dias</span>
                <span className="flex flex-col items-center gap-2"><BadgeCheck className="h-5 w-5 text-green-700" />Sem assinatura</span>
                <span className="flex flex-col items-center gap-2"><MessageCircle className="h-5 w-5 text-green-700" />Você revisa antes</span>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-4 max-w-2xl rounded-3xl border border-primary/15 bg-white/90 p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Quer começar só pelas respostas?</p>
              <h3 className="mt-1 text-xl font-bold">DoceZap Básico por R$19,90</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                São 30 respostas por 30 dias, sem os materiais do Kit e sem assinatura automática.
              </p>
            </div>
            <Button
              variant="outline"
              type="button"
              onClick={() => goToCheckout("basic", "basic_after_kit")}
              className="mt-4 h-12 w-full shrink-0 rounded-2xl border-2 border-primary/30 bg-white px-5 font-bold text-primary hover:bg-primary/5 hover:text-primary sm:mt-0 sm:w-auto"
            >
              Quero só o Básico
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-primary/10 bg-white px-5 py-2 shadow-sm">
          <h2 className="pb-1 pt-4 text-center text-xl font-bold">Dúvidas rápidas</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="automatic">
              <AccordionTrigger className="text-left">O DoceZap responde sozinho?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Não. Ele cria uma sugestão para você revisar, ajustar, copiar e mandar manualmente. Nenhuma mensagem vai para a cliente sem você enviar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery">
              <AccordionTrigger className="text-left">O que vem no Kit?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                DoceZap Premium por 30 dias, com 70 respostas e voz mais personalizada, além de Combinados da Encomenda, Cardápio que Rende e Datas que Rende.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="renewal">
              <AccordionTrigger className="text-left">É assinatura?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Não. É pagamento único. O acesso ao DoceZap é por 30 dias e não existe renovação automática.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="guarantee">
              <AccordionTrigger className="text-left">Tem garantia?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                Sim. Você tem 7 dias de garantia após a compra.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="difference" className="border-b-0">
              <AccordionTrigger className="text-left">Qual a diferença entre o Básico e o Kit?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                O Básico inclui 30 respostas do DoceZap por 30 dias. O Kit inclui o DoceZap Premium, 70 respostas, voz mais personalizada e os materiais de cardápio, combinados e datas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </section>

      <footer className="mx-auto max-w-lg px-6 pb-8 text-center text-xs leading-relaxed text-muted-foreground">
        <p>© 2026 DoceZap • Todos os direitos reservados.</p>
        <p className="mt-2">
          O Kit ajuda você a preparar respostas e materiais de atendimento. Preço, disponibilidade e combinados continuam sendo confirmados por você.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-background/95 px-4 py-3 shadow-2xl backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-muted-foreground">Kit WhatsApp da Confeitaria</p>
            <p className="text-sm font-bold text-foreground">R$49,90</p>
          </div>
          <Button
            type="button"
            onClick={() => goToCheckout("premium", "sticky_cta")}
            className="h-12 shrink-0 rounded-2xl px-5 text-sm font-bold shadow-lg shadow-primary/20"
          >
            Quero o Kit
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}

function KitJourneyPreview() {
  return (
    <div className="min-w-0 rounded-[30px] border border-primary/10 bg-white p-4 shadow-2xl shadow-primary/15 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Um pedido real</p>
          <p className="mt-1 font-bold">Veja como as partes se encaixam</p>
        </div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-800">Kit completo</span>
      </div>

      <div className="space-y-3">
        <PreviewStep
          icon={LayoutTemplate}
          label="1. Ajude a escolher"
          title="Cardápio mais claro"
          lines={["O que é", "Para quantas pessoas", "Prazo e como pedir"]}
        />
        <PreviewStep
          icon={MessageCircle}
          label="2. Continue a conversa"
          title="Resposta para revisar"
          lines={["Cliente: Vou olhar e te aviso", "Você: Me diz a data e para quantas pessoas?"]}
          accent
        />
        <PreviewStep
          icon={ClipboardCheck}
          label="3. Confirme o pedido"
          title="Combinados organizados"
          lines={["Sinal", "Alterações", "Retirada ou entrega"]}
        />
      </div>
    </div>
  );
}

function PreviewStep({
  icon: Icon,
  label,
  title,
  lines,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  lines: string[];
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? "border-green-800/15 bg-[#eef7e8]" : "border-primary/10 bg-muted/35"}`}>
      <div className="flex items-start gap-3">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${accent ? "bg-green-800 text-white" : "bg-white text-primary shadow-sm"}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
          <p className="mt-0.5 font-bold">{title}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {lines.map((line) => (
              <span key={line} className="rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold text-foreground/75 shadow-sm">
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyCard({
  number,
  title,
  text,
  product,
  icon: Icon,
}: {
  number: string;
  title: string;
  text: string;
  product: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="relative rounded-3xl border border-primary/10 bg-white p-5 shadow-sm">
      <span className="absolute right-4 top-4 text-4xl font-bold text-primary/10">{number}</span>
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-primary">{product}</p>
    </div>
  );
}

function MaterialCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  items,
  featured = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <article className={`flex h-full flex-col rounded-3xl border p-5 shadow-sm ${featured ? "border-primary bg-primary/[0.045]" : "border-primary/10 bg-white"}`}>
      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${featured ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
        <Icon className="h-6 w-6" />
      </span>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
      <h3 className="mt-1 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-bold text-muted-foreground">Você encontra:</p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-medium">
              <Check className="h-4 w-4 shrink-0 text-green-700" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function DoceZapExample() {
  return (
    <div className="rounded-[28px] border border-primary/10 bg-white p-3 shadow-2xl shadow-primary/15 sm:p-4">
      <div className="overflow-hidden rounded-[24px] border border-[#d7e9d7] bg-[#f3f8f0]">
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-sm font-bold">DZ</span>
          <div>
            <p className="text-sm font-bold">DoceZap</p>
            <p className="text-[10px] text-white/75">sugestão para você revisar</p>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
            <p>Vou olhar o cardápio e qualquer coisa te aviso.</p>
            <span className="mt-1 block text-right text-[10px] text-foreground/40">14:32</span>
          </div>

          <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] p-3 text-sm text-[#173404] shadow-sm">
            <p className="leading-relaxed">
              Claro 😊 Pra eu te ajudar a escolher, me diz pra quantas pessoas e qual é a data? Aí eu te mostro as opções que fazem mais sentido.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-green-900/10 pt-2">
              <span className="text-[10px] font-bold text-green-900/55">Revise antes de enviar</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-[10px] font-bold text-green-900">
                <Copy className="h-3 w-3" /> Copiar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
