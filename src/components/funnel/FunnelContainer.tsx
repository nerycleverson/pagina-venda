
"use client"

import React, { useEffect, useState } from 'react';
import { IntroStep } from './IntroStep';
import { QuizStep } from './QuizStep';
import { DiagnosisStep } from './DiagnosisStep';
import { ResponseStep } from './ResponseStep';
import { DemoStep } from './DemoStep';
import { OfferStep } from './OfferStep';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export type FunnelState = {
  currentStep: 'intro' | 'quiz' | 'diagnosis' | 'response' | 'demo' | 'offer';
  currentQuestionIndex: number;
  answers: Record<number, string>;
};

export default function FunnelContainer() {
  const [state, setState] = useState<FunnelState>({
    currentStep: 'intro',
    currentQuestionIndex: 0,
    answers: {},
  });

  const totalQuestions = 5;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.currentStep, state.currentQuestionIndex]);

  useEffect(() => {
    if (state.currentStep !== 'intro') {
      trackEvent("funnel_step_viewed", {
        step: state.currentStep,
        question: state.currentStep === 'quiz' ? state.currentQuestionIndex + 1 : undefined,
      });
    }
  }, [state.currentStep, state.currentQuestionIndex]);

  const handleStart = () => {
    trackEvent("quiz_started");
    setState(prev => ({ ...prev, currentStep: 'quiz' }));
  };

  const handleAnswer = (questionIndex: number, answer: string) => {
    trackEvent("quiz_answered", {
      question: questionIndex + 1,
      answer,
    });
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
        currentStep: 'diagnosis',
      }));
    }
  };

  const handleBack = () => {
    setState(prev => {
      if (prev.currentStep === 'quiz' && prev.currentQuestionIndex > 0) {
        return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 };
      }
      if (prev.currentStep === 'quiz') {
        return { ...prev, currentStep: 'intro' };
      }
      if (prev.currentStep === 'diagnosis') {
        return { ...prev, currentStep: 'quiz', currentQuestionIndex: totalQuestions - 1 };
      }
      if (prev.currentStep === 'response') {
        return { ...prev, currentStep: 'diagnosis' };
      }
      return prev;
    });
  };

  const handleDiagnosisComplete = () => {
    setState(prev => ({ ...prev, currentStep: 'response' }));
  };

  const handleResponseComplete = () => {
    setState(prev => ({ ...prev, currentStep: 'demo' }));
  };

  const handleDemoComplete = () => {
    setState(prev => ({ ...prev, currentStep: 'offer' }));
  };

  return (
    <div className="w-full max-w-lg mx-auto min-h-[calc(100vh-80px)] flex flex-col px-4 sm:px-6">
      {state.currentStep !== 'intro' && (
        <div className="flex items-center justify-between pt-5 pb-3">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>DoceZap IA</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Diagnóstico gratuito
          </span>
        </div>
      )}

      {state.currentStep === 'quiz' && (
        <div className="mb-5 rounded-2xl border border-primary/10 bg-white/80 p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
            <p className="text-xs font-bold text-muted-foreground">
              {state.currentQuestionIndex + 1} de {totalQuestions}
            </p>
          </div>
          <Progress
            value={((state.currentQuestionIndex + 1) / totalQuestions) * 100}
            className="h-2 bg-muted"
          />
        </div>
      )}

      <div key={`${state.currentStep}-${state.currentQuestionIndex}`} className="flex-1 flex flex-col justify-center animate-fade-in">
        {state.currentStep === 'intro' && <IntroStep onStart={handleStart} />}
        {state.currentStep === 'quiz' && (
          <QuizStep
            index={state.currentQuestionIndex}
            currentAnswer={state.answers[state.currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        )}
        {state.currentStep === 'diagnosis' && (
          <DiagnosisStep
            answers={state.answers}
            onBack={handleBack}
            onNext={handleDiagnosisComplete}
          />
        )}
        {state.currentStep === 'response' && (
          <ResponseStep
            answers={state.answers}
            onBack={handleBack}
            onNext={handleResponseComplete}
          />
        )}
        {state.currentStep === 'demo' && (
          <DemoStep onNext={handleDemoComplete} />
        )}
        {state.currentStep === 'offer' && (
          <OfferStep answers={state.answers} />
        )}
      </div>
    </div>
  );
}
