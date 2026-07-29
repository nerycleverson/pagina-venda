"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  LayoutTemplate,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  buildCheckoutUrlWithCurrentParams,
  trackEvent,
  trackInitiateCheckout,
  trackTikTokEvent,
} from "@/lib/analytics";

const CHECKOUT_LINK = "https://checkout.chocolaterende.com/VCCL1O8SD38E";
const CHECKOUT_REDIRECT_DELAY_MS = 400;

const PRODUCT = {
  content_id: "VCCL1O8SD38E",
  content_name: "Cardápio Pronto para Pedido",
  content_type: "product",
  value: 49.9,
  currency: "BRL",
  quantity: 1,
} as const;

const OFFER_ITEMS = [
  "Checklist do que mostrar: descrição, rendimento, preço, prazo e como pedir",
  "Modelo de descrição que você copia e adapta aos seus produtos",
  "DoceZap para desconto, preço, cliente indecisa e pedido incompleto",
  "Até 70 sugestões em 30 dias, ajustadas ao jeito que você quer responder",
  "Mensagens para alinhar sinal, alterações, retirada e entrega",
  "Checklist para conferir a encomenda antes de começar a produção",
];

export function DemoLanding() {
  useEffect(() => {
    trackEvent("landing_demo_viewed");
    trackEvent("offer_viewed", {
      recommended_plan: "premium",
      source: "editorial_product_landing",
    });
    trackTikTokEvent("ViewContent", PRODUCT);
  }, []);

  const goToCheckout = (source: string) => {
    trackInitiateCheckout("premium");
    trackEvent("checkout_clicked", { plan: "premium", source });
    trackTikTokEvent("InitiateCheckout", PRODUCT);
    const checkoutUrl = buildCheckoutUrlWithCurrentParams(CHECKOUT_LINK);

    window.setTimeout(() => {
      window.location.href = checkoutUrl;
    }, CHECKOUT_REDIRECT_DELAY_MS);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf5ef] pb-24 text-[#241713]">
      <header className="border-b border-[#6f3d31]/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5 text-[#9e463a]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#9e463a] text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-headline text-lg font-bold">Chocolate Rende</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6f554d] sm:text-xs">
            Para confeiteiras
          </span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16">
        <div>
          <p className="inline-flex border-l-4 border-[#b35b51] bg-white px-3 py-2 text-sm font-bold text-[#8d4137] shadow-sm">
            Ela abriu o cardápio e ainda perguntou preço, rendimento e como pedir?
          </p>

          <h1 className="mt-6 max-w-2xl font-headline text-[2.55rem] font-bold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.6rem]">
            Um cardápio que explica antes de você precisar responder.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6f554d] sm:text-xl">
            Use uma estrutura que mostra o que é o produto, quanto serve, qual é o preço, com quanto tempo pedir e o que a cliente precisa enviar para encomendar.
          </p>

          <div className="mt-7 flex max-w-md flex-col gap-3">
            <Button
              type="button"
              onClick={() => goToCheckout("hero")}
              className="h-16 rounded-none bg-[#9e463a] px-5 text-lg font-bold shadow-xl shadow-[#9e463a]/20 hover:bg-[#84372f]"
            >
              Quero organizar por R$49,90
              <ArrowRight className="h-5 w-5" />
            </Button>
            <a
              href="#por-dentro"
              className="flex h-12 items-center justify-center border border-[#9e463a]/25 bg-white/70 px-4 text-sm font-bold text-[#8d4137] transition-colors hover:bg-white"
            >
              Ver uma parte do material
            </a>
          </div>

          <div className="mt-6 hidden flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#6f554d] lg:flex">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#2f6e48]" />Pagamento único</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#2f6e48]" />Garantia de 7 dias</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#2f6e48]" />Acesso pelo navegador</span>
          </div>

          <p className="mt-5 hidden max-w-xl text-xs leading-relaxed text-[#806b64] lg:block">
            Você recebe a estrutura e os modelos para adaptar. O material não vem preenchido com seus produtos, preços e prazos.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-3 rotate-2 bg-[#d7a947]/20" aria-hidden="true" />
          <div className="relative border border-[#6f3d31]/15 bg-white p-3 shadow-[0_28px_80px_rgba(73,36,27,0.18)] sm:p-5">
            <Image
              src="/produtos/cardapio-pronto-checkout.png"
              alt="Capa do Cardápio Pronto para Pedido"
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 1023px) 92vw, 500px"
              className="h-auto w-full"
            />
          </div>
          <span className="absolute -bottom-4 -left-2 bg-[#263d2c] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg sm:-left-5">
            Produto principal
          </span>

          <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#6f554d] lg:hidden">
            <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#2f6e48]" />Pagamento único</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#2f6e48]" />Garantia de 7 dias</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#2f6e48]" />Acesso pelo navegador</span>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-[#806b64] lg:hidden">
            Você recebe a estrutura e os modelos para adaptar. O material não vem preenchido com seus produtos, preços e prazos.
          </p>
        </div>
      </section>

      <section className="bg-[#2b1c18] text-[#fffaf5]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#dda960]">O que muda na prática</p>
            <h2 className="mt-3 font-headline text-4xl font-bold leading-tight sm:text-5xl">A diferença não é deixar bonito. É parar de esconder informação importante.</h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="border border-white/15 bg-white/[0.045] p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#df9a90]">Antes</p>
                <span className="text-xs text-white/45">Exemplo comum</span>
              </div>
              <div className="mt-5 overflow-hidden bg-[#fffaf5]">
                <Image
                  src="/provas/cardapio-antes-mini-donuts.png"
                  alt="Cardápio de mini donuts com sabores e fotos, mas sem preço, rendimento, prazo ou instrução para pedir"
                  width={1536}
                  height={2048}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="h-[420px] w-full object-cover object-top"
                />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                Bonito, mas a cliente ainda precisa perguntar preço, quantidade, prazo e como pedir.
              </p>
            </article>

            <article className="border border-[#d8a24b] bg-[#fffaf5] p-5 text-[#241713] sm:p-7">
              <div className="flex items-center justify-between gap-3 border-b border-[#6f3d31]/15 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2f6e48]">Depois</p>
                <span className="text-xs text-[#806b64]">Modelo para adaptar</span>
              </div>
              <div className="mt-5 border-l-4 border-[#b35b51] bg-white p-5 shadow-sm">
                <p className="font-headline text-2xl font-bold">Bolo de Ninho com Morango</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6f554d]">Massa branca, recheio de creme de Ninho e morangos frescos.</p>
                <div className="mt-4 space-y-1.5 text-sm font-bold">
                  <p>20 cm • serve aproximadamente 18 a 22 pessoas</p>
                  <p>A partir de R$ [valor]</p>
                  <p>Encomendas com pelo menos [prazo] de antecedência</p>
                </div>
                <p className="mt-4 border-t border-[#6f3d31]/10 pt-3 text-sm text-[#8d4137]">Para pedir, envie a data e a quantidade de pessoas.</p>
              </div>
            </article>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-white/50">
            O exemplo mostra a estrutura do material. Valores, prazos, rendimento e formas de entrega ou retirada são definidos por você.
          </p>
        </div>
      </section>

      <section id="por-dentro" className="scroll-mt-6 border-b border-[#6f3d31]/15 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
          <div className="overflow-hidden border border-[#6f3d31]/15 bg-[#f4e8df] shadow-[0_24px_70px_rgba(73,36,27,0.12)]">
            <Image
              src="/provas/docezap-cardapio.png"
              alt="Tela real do Cardápio que Rende com modelo de descrição de bolo"
              width={710}
              height={600}
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="h-auto w-full"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9e463a]">Tela real do produto</p>
            <h2 className="mt-3 font-headline text-4xl font-bold leading-tight sm:text-5xl">Você não começa olhando uma página em branco.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#6f554d]">
              Você vê as informações que costumam faltar, copia um modelo de descrição e adapta com o produto, o preço e o prazo da sua confeitaria.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "O que escrever além do nome e da foto do produto.",
                "Como informar tamanho, rendimento e o que está incluído.",
                "Onde colocar o preço ou explicar que depende da personalização.",
                "Como mostrar antecedência, retirada ou entrega e o próximo passo.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-[#6f3d31]/10 pb-4 text-sm font-bold leading-relaxed">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#2f6e48]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9e463a]">A compra inclui</p>
            <h2 className="mt-3 font-headline text-4xl font-bold leading-tight sm:text-5xl">O Cardápio abre a conversa. Os bônus ajudam a responder e confirmar o pedido.</h2>
            <p className="mt-5 text-base leading-relaxed text-[#6f554d]">
              Veja o que você faz com cada parte da oferta, desde a apresentação do produto até a confirmação da encomenda.
            </p>
          </div>

          <div className="divide-y divide-[#6f3d31]/15 border-y border-[#6f3d31]/20">
            <OfferRow
              number="01"
              icon={LayoutTemplate}
              label="Produto principal"
              title="Cardápio que Rende"
              text="Em vez de mostrar só nome, foto e “consulte valores”, você monta uma apresentação que responde as dúvidas básicas antes da conversa começar."
              items={[
                "Confira as 8 informações que um produto precisa mostrar.",
                "Copie um modelo de descrição e troque pelos dados do seu produto.",
                "Deixe visíveis rendimento, preço, antecedência e como pedir.",
              ]}
            />
            <OfferRow
              number="02"
              icon={MessageCircle}
              label="Bônus 1"
              title="DoceZap Premium por 30 dias"
              text="Cole a mensagem da cliente, escolha o que aconteceu e informe os detalhes do pedido. O DoceZap monta uma sugestão para você revisar antes de enviar."
              items={[
                "Use em desconto, “está caro”, cliente indecisa, sumiço depois do preço e pedido incompleto.",
                "Mantenha uma aba por cliente para continuar a conversa sem começar do zero.",
                "Configure como quer responder, encurte o texto, revise e copie.",
                "Gere até 70 sugestões durante os 30 dias de acesso.",
              ]}
            />
            <OfferRow
              number="03"
              icon={ClipboardCheck}
              label="Bônus 2"
              title="Combinados da Encomenda"
              text="Antes de produzir, organize o que foi acertado e envie um resumo para a cliente confirmar. Depois, confira os detalhes no checklist interno."
              items={[
                "Data, produto, sabor, tamanho, decoração e referência visual.",
                "Valor total, sinal, restante e prazos de alteração ou cancelamento.",
                "Retirada ou entrega, endereço, taxa e confirmação final da cliente.",
              ]}
            />
          </div>
        </div>
      </section>

      <section id="oferta" className="bg-[#9e463a] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f0c696]">Cardápio Pronto para Pedido</p>
            <h2 className="mt-3 font-headline text-4xl font-bold leading-tight sm:text-5xl">Organize o que a cliente precisa saber antes de encomendar.</h2>
            <p className="mt-5 text-base leading-relaxed text-white/75">Pagamento único. Sem assinatura automática.</p>
          </div>

          <div className="bg-[#fffaf5] p-5 text-[#241713] shadow-2xl sm:p-8">
            <p className="text-sm font-bold text-[#806b64]">Oferta completa por</p>
            <p className="mt-1 font-headline text-6xl font-bold tracking-tight text-[#9e463a]">R$49,90</p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {OFFER_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-bold leading-snug">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2f6e48]" />
                  {item}
                </li>
              ))}
            </ul>

            <Button
              type="button"
              onClick={() => goToCheckout("main_offer")}
              className="mt-8 h-16 w-full rounded-none bg-[#263d2c] px-5 text-lg font-bold shadow-lg hover:bg-[#1d3022]"
            >
              Quero organizar meu cardápio
              <ArrowRight className="h-5 w-5" />
            </Button>

            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#6f3d31]/15 pt-5 text-center text-[10px] font-bold leading-tight text-[#6f554d] sm:text-xs">
              <span>Garantia de 7 dias</span>
              <span>Sem assinatura</span>
              <span>Acesso pelo navegador</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="border-y border-[#6f3d31]/20">
          <h2 className="py-6 text-center font-headline text-3xl font-bold">Antes de comprar</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="filled">
              <AccordionTrigger className="text-left">O cardápio já vem preenchido?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#6f554d]">
                Não. Você recebe a estrutura, orientações e modelos para adaptar aos seus produtos, preços, prazos e formas de entrega ou retirada.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="receive">
              <AccordionTrigger className="text-left">O que eu recebo?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#6f554d]">
                Você recebe o Cardápio que Rende para estruturar descrição, rendimento, preço, prazo e como pedir; o DoceZap Premium por 30 dias para gerar até 70 sugestões em situações como desconto, preço e cliente indecisa; e os Combinados da Encomenda para organizar sinal, alterações, retirada, entrega e confirmação do pedido.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-docezap">
              <AccordionTrigger className="text-left">Como o DoceZap funciona na conversa?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#6f554d]">
                Você cola a mensagem da cliente, escolhe a situação e informa o que sabe sobre o pedido. O DoceZap cria uma sugestão, mostra um próximo passo e permite encurtar ou copiar o texto. Você confere tudo antes de enviar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="renewal">
              <AccordionTrigger className="text-left">É assinatura?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#6f554d]">
                Não. O pagamento é único e não existe renovação automática. O acesso ao DoceZap é por 30 dias.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="automatic">
              <AccordionTrigger className="text-left">O DoceZap responde sozinho?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#6f554d]">
                Não. Ele cria uma sugestão para você revisar, ajustar, copiar e mandar manualmente. Nenhuma mensagem é enviada sem você.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="guarantee" className="border-b-0">
              <AccordionTrigger className="text-left">Tem garantia?</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#6f554d]">
                Sim. Você tem 7 dias de garantia após a compra.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="mx-auto max-w-2xl px-6 pb-8 text-center text-xs leading-relaxed text-[#806b64]">
        <p>© 2026 Chocolate Rende • Todos os direitos reservados.</p>
        <p className="mt-2">
          Produtos, preços, prazos, disponibilidade e combinados continuam sendo definidos por você.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#6f3d31]/15 bg-[#fffaf5]/95 px-4 py-3 shadow-2xl backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-[#806b64]">Cardápio Pronto para Pedido</p>
            <p className="text-sm font-bold">R$49,90</p>
          </div>
          <Button
            type="button"
            onClick={() => goToCheckout("sticky_cta")}
            className="h-12 shrink-0 rounded-none bg-[#9e463a] px-5 text-sm font-bold shadow-lg hover:bg-[#84372f]"
          >
            Quero organizar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}

function OfferRow({
  number,
  icon: Icon,
  label,
  title,
  text,
  items,
}: {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  text: string;
  items: string[];
}) {
  return (
    <article className="grid gap-4 py-6 sm:grid-cols-[3rem_3rem_1fr] sm:items-start">
      <span className="font-headline text-3xl font-bold text-[#9e463a]/35">{number}</span>
      <span className="grid h-11 w-11 place-items-center bg-[#9e463a] text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9e463a]">{label}</p>
        <h3 className="mt-1 font-headline text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#6f554d]">{text}</p>
        <ul className="mt-4 grid gap-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#3f2b25]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2f6e48]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
