"use client"

import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Crown, LockKeyhole, MailCheck, MessageSquare, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { trackEvent, trackTikTokEvent } from '@/lib/analytics';
import { PremiumPopup } from './PremiumPopup';

interface OfferStepProps {
  answers: Record<number, string>;
}

const CHECKOUT_LINKS = {
  basic: "https://checkout.chocolaterende.com/VCCL1O8SD38D",
  premium: "https://checkout.chocolaterende.com/VCCL1O8SD38E",
  premiumSpecial: "https://checkout.chocolaterende.com/VCCL1O8SD38J"
};

const TIKTOK_PRODUCTS = {
  basic: {
    content_id: "VCCL1O8SD38D",
    content_name: "DoceZap Básico - 30 respostas",
    content_type: "product",
    value: 19.9,
    currency: "BRL",
    quantity: 1,
  },
  premium: {
    content_id: "VCCL1O8SD38E",
    content_name: "DoceZap Premium - 70 respostas",
    content_type: "product",
    value: 29.9,
    currency: "BRL",
    quantity: 1,
  },
  premium_special: {
    content_id: "VCCL1O8SD38J",
    content_name: "DoceZap Premium - oferta",
    content_type: "product",
    value: 23.9,
    currency: "BRL",
    quantity: 1,
  },
} as const;

const PAIN_LABELS: Record<string, string> = {
  "Cliente recebe o preço e some": "retomar clientes depois do orçamento",
  "Cliente pede desconto": "responder pedidos de desconto",
  "Cliente diz que está caro": "sustentar seu preço com segurança",
  "Não sei como conduzir a conversa": "conduzir conversas difíceis"
};

export function OfferStep({ answers }: OfferStepProps) {
  const [showUpsell, setShowUpsell] = useState(false);

  const stage = answers[0] || "";
  const volume = answers[1] || "";
  const pain = answers[2] || "";
  const tone = answers[3] || "Carinhosa, cheia de amor";
  const goal = answers[4] || "";

  const isPremiumRecommended =
    stage === "É minha principal fonte de renda" ||
    volume === "De 16 a 30 clientes" ||
    volume === "Mais de 30 clientes" ||
    goal === "Tudo isso, sem perder meu jeito";

  const plan = isPremiumRecommended ? "PREMIUM" : "BÁSICO";
  const price = isPremiumRecommended ? "R$ 29,90" : "R$ 19,90";
  const painLabel = PAIN_LABELS[pain] || "lidar com conversas difíceis";

  const recommendationReason = isPremiumRecommended
    ? volume === "De 16 a 30 clientes" || volume === "Mais de 30 clientes"
      ? "Como chegam " + volume.toLowerCase() + " por semana, o Premium dá mais respostas e mantém o mesmo jeito de falar em todo atendimento."
      : "Você disse que quer responder melhor sem perder seu jeito. No Premium, você configura a voz do DoceZap para ele responder mais parecido com você."
    : "Como chegam " + volume.toLowerCase() + " por semana, o Básico já dá conta do seu atendimento sem você pagar por respostas que talvez ainda não use.";

  const features = isPremiumRecommended
    ? [
        "70 respostas para usar durante 30 dias",
        "Voz personalizada no estilo " + tone.toLowerCase(),
        "As 9 situações de atendimento liberadas",
        "Resposta principal, versão curta e próximo passo",
        "Histórico para reencontrar suas melhores respostas"
      ]
    : [
        "30 respostas para usar durante 30 dias",
        "Tom caloroso padrão do DoceZap",
        "As 9 situações de atendimento liberadas",
        "Resposta principal, versão curta e próximo passo",
        "Histórico para reencontrar suas melhores respostas"
      ];

  useEffect(() => {
    const recommendedPlan = isPremiumRecommended ? "premium" : "basic";
    trackEvent("offer_viewed", {
      recommended_plan: recommendedPlan,
      volume,
    });
    trackTikTokEvent("ViewContent", TIKTOK_PRODUCTS[recommendedPlan]);
  }, [isPremiumRecommended, volume]);

  const goToCheckout = (planId: "basic" | "premium" | "premium_special", url: string, source: string) => {
    trackEvent("checkout_clicked", { plan: planId, source });
    trackTikTokEvent("InitiateCheckout", TIKTOK_PRODUCTS[planId]);
    window.location.href = url;
  };

  const handleCheckout = () => {
    if (isPremiumRecommended) {
      goToCheckout("premium", CHECKOUT_LINKS.premium, "recommended_offer");
      return;
    }
    trackEvent("premium_upsell_opened");
    setShowUpsell(true);
  };

  return (
    <div className="space-y-6 pb-8 pt-3 animate-fade-in">
      <div className="text-center">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent">
          {isPremiumRecommended ? <Crown className="h-7 w-7" /> : <Sparkles className="h-7 w-7" />}
        </span>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">Recomendação personalizada</p>
        <h2 className="text-3xl font-bold leading-tight">
          O pacote {plan === "PREMIUM" ? "Premium" : "Básico"} combina mais com o seu momento
        </h2>
      </div>

      <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-4 text-sm leading-relaxed">
        <strong>Por que este pacote?</strong> {recommendationReason}
      </div>

      <div className="overflow-hidden rounded-3xl border-2 border-primary bg-white shadow-2xl shadow-primary/15">
        <div className="flex items-center justify-between gap-3 bg-primary px-5 py-3 text-white">
          <span className="font-bold">Pacote {plan === "PREMIUM" ? "Premium" : "Básico"}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
            Recomendado para você
          </span>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary">{price}</span>
              <span className="pb-1 text-sm text-muted-foreground">pagamento único</span>
            </div>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              Acesso por 30 dias • sem renovação automática
            </p>
          </div>

          <div className="flex gap-3 rounded-2xl bg-muted/60 p-4">
            <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed">
              Use o DoceZap para <strong>{painLabel}</strong> e outras situações comuns no WhatsApp.
            </p>
          </div>

          <ul className="space-y-3">
            {features.map(feature => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <span className="text-sm font-medium leading-snug">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleCheckout}
            className="h-16 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
          >
            {isPremiumRecommended ? "Comprar Premium" : "Comprar Básico"}
            <ArrowRight className="h-5 w-5" />
          </Button>

          <div className="grid grid-cols-2 gap-3 border-t pt-4 text-center sm:grid-cols-4">
            {[
              { icon: LockKeyhole, text: "Checkout seguro" },
              { icon: MailCheck, text: "Liberação automática" },
              { icon: ShieldCheck, text: "Sem assinatura" },
              { icon: RotateCcw, text: "Garantia de 7 dias" }
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 text-[10px] font-bold leading-tight text-muted-foreground">
                <Icon className="h-4 w-4 text-green-700" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isPremiumRecommended && (
        <div className="rounded-3xl border border-primary/15 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Prefere começar pelo Básico?
              </p>
              <h3 className="mt-1 text-xl font-bold">Pacote Básico</h3>
            </div>
            <span className="shrink-0 text-2xl font-bold text-primary">R$ 19,90</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Você recebe 30 respostas e pode usar as mesmas 9 situações. Ele usa o tom caloroso padrão do DoceZap, sem a voz personalizada do Premium.
          </p>
          <Button
            variant="outline"
            onClick={() => goToCheckout("basic", CHECKOUT_LINKS.basic, "premium_alternative")}
            className="mt-4 h-12 w-full rounded-2xl border-2 border-primary/30 bg-white font-bold text-primary hover:bg-primary/5 hover:text-primary"
          >
            Comprar Básico
          </Button>
        </div>
      )}

      <div className="rounded-3xl border border-primary/10 bg-white px-5 py-2 shadow-sm">
        <h3 className="pb-1 pt-4 text-center text-xl font-bold">Dúvidas rápidas</h3>
        <Accordion
          type="single"
          collapsible
          onValueChange={(item) => {
            if (item) trackEvent("faq_opened", { item });
          }}
        >
          <AccordionItem value="install">
            <AccordionTrigger className="text-left">Preciso instalar alguma coisa?</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              Não. O DoceZap funciona pelo navegador do celular ou do computador. Depois da compra, use o mesmo e-mail para criar sua conta e liberar o pacote.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="automatic">
            <AccordionTrigger className="text-left">O DoceZap responde sozinho?</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              Não. Você cola a mensagem da cliente, o DoceZap prepara a resposta e você confere antes de copiar e enviar pelo WhatsApp.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="guarantee">
            <AccordionTrigger className="text-left">Tem garantia?</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              Sim. Você tem 7 dias após a compra para testar o DoceZap. Se não fizer sentido para você, pode pedir o cancelamento e o reembolso pelo suporte.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="responses" className="border-b-0">
            <AccordionTrigger className="text-left">O que acontece quando minhas respostas acabam?</AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              O pacote não renova sozinho. Quando as respostas acabarem ou os 30 dias terminarem, você escolhe se quer comprar outro pacote.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <p className="px-4 text-center text-xs leading-relaxed text-muted-foreground">
        O DoceZap ajuda você a escrever respostas melhores. Informações como preço, disponibilidade e políticas continuam sendo confirmadas por você.
      </p>

      <PremiumPopup
        isOpen={showUpsell}
        onClose={() => setShowUpsell(false)}
        onAccept={() => goToCheckout("premium_special", CHECKOUT_LINKS.premiumSpecial, "upsell_accept")}
        onDecline={() => goToCheckout("basic", CHECKOUT_LINKS.basic, "upsell_decline")}
      />
    </div>
  );
}
