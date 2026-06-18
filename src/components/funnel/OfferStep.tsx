
"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PremiumPopup } from './PremiumPopup';
import { CheckCircle2, MessageSquare, Sparkles, UserCheck } from 'lucide-react';

interface OfferStepProps {
  answers: Record<number, string>;
}

export function OfferStep({ answers }: OfferStepProps) {
  const [showUpsell, setShowUpsell] = useState(false);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);

  const q1 = answers[0]; // Renda
  const q2 = answers[1]; // Volume
  const q6 = answers[5]; // Willingness
  const tone = answers[4];

  const isLeadMagnet = q1 === "Só faço pra família" || q6 === "Talvez, preciso ver";
  
  const isPremiumRecommended = 
    q2 === "16 a 30" || 
    q2 === "Mais de 30" || 
    (q1 === "É minha renda principal" && q6 === "Sim, ontem!");

  const checkoutLinks = {
    basic: "COLE_AQUI_CHECKOUT_BASICO",
    premium: "COLE_AQUI_CHECKOUT_PREMIUM",
    premiumSpecial: "COLE_AQUI_CHECKOUT_PREMIUM_OFERTA"
  };

  const handleBasicClick = () => {
    setShowUpsell(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadFormSubmitted(true);
  };

  if (isLeadMagnet) {
    return (
      <div className="text-center space-y-8 py-4 animate-fade-in">
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
          <Sparkles className="w-12 h-12 text-accent mx-auto" />
          <h2 className="text-2xl font-bold text-primary">Temos um convite especial para você!</h2>
          <p className="text-muted-foreground">
            Como você está começando agora ou faz para a família, preparamos um <b>Teste Grátis</b> com 3 respostas inteligentes para você ver o poder do DoceZap IA.
          </p>
        </div>

        {!leadFormSubmitted ? (
          <form onSubmit={handleLeadSubmit} className="space-y-4 px-2 text-left">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground">Seu melhor WhatsApp ou E-mail</label>
              <Input required placeholder="Ex: (11) 99999-9999" className="h-14 text-lg rounded-lg" />
            </div>
            <Button type="submit" className="w-full h-16 text-xl rounded-lg font-bold bg-primary">
              Enviar meu acesso grátis
            </Button>
          </form>
        ) : (
          <div className="p-8 bg-green-50 border border-green-200 rounded-lg space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="text-xl font-bold text-green-800">Tudo pronto!</h3>
            <p className="text-green-700">Enviamos as instruções de acesso para você. Verifique seu WhatsApp em instantes.</p>
          </div>
        )}
      </div>
    );
  }

  const plan = isPremiumRecommended ? 'PREMIUM' : 'BÁSICO';
  const price = isPremiumRecommended ? 'R$ 29,90' : 'R$ 15,00';
  const description = isPremiumRecommended 
    ? `Ideal para quem atende muitas clientes. A IA responderá com o seu tom ${tone.toLowerCase()} e lembrará de todas as conversas.`
    : `Ideal para quem está começando a escalar. 30 respostas profissionais com o seu tom de voz ${tone.toLowerCase()}.`;

  return (
    <div className="space-y-8 py-4 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary leading-tight">Plano Recomendado para você:</h2>
        <div className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full font-bold text-sm uppercase tracking-wider">
          {plan}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl border-2 border-primary overflow-hidden relative">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-4xl font-bold text-primary">{price}</h3>
              <p className="text-sm text-muted-foreground">Pagamento único (uso por 30 dias)</p>
            </div>
          </div>

          <p className="text-lg leading-relaxed border-t pt-4">
            {description}
          </p>

          <ul className="space-y-3">
            {[
              isPremiumRecommended ? "70 respostas inteligentes" : "30 respostas inteligentes",
              "Respostas em todas as situações",
              isPremiumRecommended ? "Sua Voz Personalizada (Exclusivo)" : "Tom de voz configurado",
              "Suporte prioritário via WhatsApp",
              "Acesso imediato após o pagamento"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <Button 
            onClick={() => {
              if (plan === 'BÁSICO') handleBasicClick();
              else window.location.href = checkoutLinks.premium;
            }}
            className="w-full h-16 text-xl rounded-lg font-bold shadow-lg bg-primary hover:bg-primary/90"
          >
            Quero o Plano {plan}
          </Button>
        </div>
      </div>

      <PremiumPopup 
        isOpen={showUpsell} 
        onClose={() => setShowUpsell(false)}
        onAccept={() => window.location.href = checkoutLinks.premiumSpecial}
        onDecline={() => window.location.href = checkoutLinks.basic}
      />
    </div>
  );
}
