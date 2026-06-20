"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const QUESTIONS = [
  {
    eyebrow: "Primeiro, seu momento atual",
    text: "Hoje, em que fase está sua confeitaria?",
    options: [
      "É minha principal fonte de renda",
      "É uma renda extra importante",
      "Estou começando a vender agora",
      "Ainda faço só para família e amigos"
    ]
  },
  {
    eyebrow: "Sobre seu WhatsApp",
    text: "Em uma semana comum, quantas clientes chegam no seu WhatsApp?",
    options: [
      "Até 5 clientes",
      "De 6 a 15 clientes",
      "De 16 a 30 clientes",
      "Mais de 30 clientes"
    ]
  },
  {
    eyebrow: "Onde você mais perde clientes",
    text: "Em qual dessas situações você sente que mais perde clientes?",
    options: [
      "Cliente recebe o preço e some",
      "Cliente pede desconto",
      "Cliente diz que está caro",
      "Não sei como conduzir a conversa"
    ]
  },
  {
    eyebrow: "Seu jeito também importa",
    text: "Se você pudesse responder melhor suas clientes hoje, como queria soar?",
    options: [
      "Carinhosa, cheia de amor",
      "Direta e profissional",
      "Descontraída e brincalhona"
    ]
  },
  {
    eyebrow: "Última pergunta",
    text: "O que faria mais diferença no seu atendimento hoje?",
    options: [
      "Responder mais rápido",
      "Defender meu preço com segurança",
      "Ter ajuda nas conversas difíceis",
      "Tudo isso, sem perder meu jeito"
    ]
  }
];

interface QuizStepProps {
  index: number;
  currentAnswer?: string;
  onAnswer: (index: number, answer: string) => void;
}

export function QuizStep({ index, currentAnswer, onAnswer }: QuizStepProps) {
  const question = QUESTIONS[index];
  const [selected, setSelected] = useState<string | null>(currentAnswer || null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSelected(currentAnswer || null);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentAnswer, index]);

  const choose = (option: string) => {
    if (timeoutRef.current) return;
    setSelected(option);
    timeoutRef.current = setTimeout(() => onAnswer(index, option), 220);
  };

  return (
    <div className="pb-8 pt-2">
      <div className="mb-7 px-2 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          {question.eyebrow}
        </p>
        <h2 className="text-3xl font-bold leading-tight text-foreground">
          {question.text}
        </h2>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, i) => {
          const isSelected = selected === option;
          return (
            <button
              type="button"
              key={option}
              onClick={() => choose(option)}
              className={cn(
                "group flex min-h-[68px] w-full items-center gap-4 rounded-2xl border-2 bg-white px-4 py-3 text-left text-base font-bold shadow-sm transition-all active:scale-[0.99]",
                isSelected
                  ? "border-primary bg-primary/5 text-primary shadow-md shadow-primary/10"
                  : "border-transparent hover:border-primary/30 hover:shadow-md"
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold transition-colors",
                  isSelected ? "bg-primary text-white" : "bg-muted text-primary group-hover:bg-primary/10"
                )}
              >
                {isSelected ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + i)}
              </span>
              <span className="leading-snug">{option}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        Toque em uma resposta para continuar
      </p>
    </div>
  );
}
