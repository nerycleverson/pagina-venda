
"use client"

import React from 'react';
import { Button } from '@/components/ui/button';

const QUESTIONS = [
  {
    text: "Você vende doces ou bolos hoje?",
    options: [
      "É minha renda principal",
      "Faço como renda extra",
      "Tô começando agora",
      "Só faço pra família"
    ]
  },
  {
    text: "Quantas clientes te chamam no WhatsApp por semana?",
    options: [
      "Até 5",
      "6 a 15",
      "16 a 30",
      "Mais de 30"
    ]
  },
  {
    text: "O que mais te trava nas conversas?",
    options: [
      "Cliente que acha caro e some",
      "Cliente que pede desconto e eu não seguro",
      "Demoro pra responder e perco a venda",
      "Travo no que escrever pra não parecer robô"
    ]
  },
  {
    text: "Quando uma cliente some depois do preço, como você se sente?",
    options: [
      "Frustrada, sinto que perdi dinheiro",
      "Insegura, será que cobrei demais?",
      "Sem tempo pra ficar pensando em resposta"
    ]
  },
  {
    text: "Como você gosta de falar com suas clientes?",
    options: [
      "Super carinhosa, cheia de amor",
      "Direta e profissional",
      "Descontraída e brincalhona"
    ]
  },
  {
    text: "Se existisse uma IA que respondesse suas clientes no seu lugar, com a SUA voz, você usaria?",
    options: [
      "Sim, ontem!",
      "Sim, se for fácil",
      "Talvez, preciso ver"
    ]
  }
];

interface QuizStepProps {
  index: number;
  onAnswer: (index: number, answer: string) => void;
}

export function QuizStep({ index, onAnswer }: QuizStepProps) {
  const question = QUESTIONS[index];

  return (
    <div className="space-y-8 py-4">
      <h2 className="text-2xl font-bold text-center px-4 leading-snug">
        {question.text}
      </h2>

      <div className="grid gap-4 px-2">
        {question.options.map((option, i) => (
          <Button
            key={i}
            variant="outline"
            className="w-full h-16 text-left justify-start px-6 text-lg border-2 hover:border-primary hover:bg-secondary rounded-lg transition-all active:scale-[0.98]"
            onClick={() => onAnswer(index, option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
