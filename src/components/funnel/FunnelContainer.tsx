
"use client"

import React, { useState } from 'react';
import { IntroStep } from './IntroStep';
import { QuizStep } from './QuizStep';
import { DemoStep } from './DemoStep';
import { OfferStep } from './OfferStep';
import { Progress } from '@/components/ui/progress';

export type FunnelState = {
  currentStep: 'intro' | 'quiz' | 'demo' | 'offer';
  currentQuestionIndex: number;
  answers: Record<number, string>;
};

export default function FunnelContainer() {
  const [state, setState] = useState<FunnelState>({
    currentStep: 'intro',
    currentQuestionIndex: 0,
    answers: {},
  });

  const totalQuestions = 6;

  const handleStart = () => {
    setState(prev => ({ ...prev, currentStep: 'quiz' }));
  };

  const handleAnswer = (questionIndex: number, answer: string) => {
    const nextAnswers = { ...state.answers, [questionIndex]: answer };
    
    if (questionIndex < totalQuestions - 1) {
      setState(prev => ({
        ...prev,
        answers: nextAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    } else {
      setState(prev => ({
        ...prev,
        answers: nextAnswers,
        currentStep: 'demo',
      }));
    }
  };

  const handleDemoComplete = () => {
    setState(prev => ({ ...prev, currentStep: 'offer' }));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-4">
      {state.currentStep === 'quiz' && (
        <div className="mb-8 mt-4">
          <Progress 
            value={((state.currentQuestionIndex + 1) / totalQuestions) * 100} 
            className="h-2 bg-muted"
          />
          <p className="text-xs text-center mt-2 text-muted-foreground font-bold">
            PASSO {state.currentQuestionIndex + 1} DE {totalQuestions}
          </p>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center animate-fade-in">
        {state.currentStep === 'intro' && <IntroStep onStart={handleStart} />}
        {state.currentStep === 'quiz' && (
          <QuizStep 
            index={state.currentQuestionIndex} 
            onAnswer={handleAnswer} 
          />
        )}
        {state.currentStep === 'demo' && (
          <DemoStep 
            answers={state.answers} 
            onNext={handleDemoComplete} 
          />
        )}
        {state.currentStep === 'offer' && (
          <OfferStep answers={state.answers} />
        )}
      </div>
    </div>
  );
}
