
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { simulateWhatsappResponse, type SimulateWhatsappResponseInput } from '@/ai/flows/simulate-whatsapp-response';
import { Check, CheckCheck } from 'lucide-react';

interface DemoStepProps {
  answers: Record<number, string>;
  onNext: () => void;
}

export function DemoStep({ answers, onNext }: DemoStepProps) {
  const [loading, setLoading] = useState(true);
  const [demoData, setDemoData] = useState<{ customerMessage: string; aiResponse: string } | null>(null);
  const [showAgentMessage, setShowAgentMessage] = useState(false);
  const [typingText, setTypingText] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const painPoint = answers[2] as SimulateWhatsappResponseInput['customerObjection'];
  const tone = answers[4] as SimulateWhatsappResponseInput['confectionerTone'];

  useEffect(() => {
    async function loadDemo() {
      try {
        const result = await simulateWhatsappResponse({
          customerObjection: painPoint || 'Cliente que acha caro e some',
          confectionerTone: tone || 'Carinhosa, cheia de amor',
        });
        setDemoData(result);
        setLoading(false);
        
        // Start showing the agent message after a short delay once loaded
        setTimeout(() => setShowAgentMessage(true), 1500);
      } catch (err) {
        console.error("Failed to simulate", err);
        setLoading(false);
      }
    }
    loadDemo();
  }, [painPoint, tone]);

  useEffect(() => {
    if (showAgentMessage && demoData) {
      let currentIdx = 0;
      const fullText = demoData.aiResponse;
      
      typingIntervalRef.current = setInterval(() => {
        if (currentIdx < fullText.length) {
          setTypingText(fullText.substring(0, currentIdx + 1));
          currentIdx++;
        } else {
          if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        }
      }, 30);
    }
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [showAgentMessage, demoData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-20">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-primary animate-pulse">Criando sua demonstração...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <div className="text-center px-4 space-y-2">
        <h2 className="text-2xl font-bold text-primary">Veja como funciona:</h2>
        <p className="text-muted-foreground">Sua cliente te chama com a dor que você escolheu...</p>
      </div>

      <div className="bg-white/50 rounded-lg p-6 shadow-sm border space-y-4 relative overflow-hidden min-h-[300px]">
        {/* Customer Bubble */}
        <div className="flex justify-start">
          <div className="relative bg-whatsapp-client text-foreground p-3 rounded-lg max-w-[85%] chat-bubble-tail-client shadow-sm">
            <p className="text-sm">{demoData?.customerMessage}</p>
            <div className="flex justify-end items-center gap-1 mt-1">
              <span className="text-[10px] opacity-60">14:32</span>
            </div>
          </div>
        </div>

        {/* AI Agent Bubble */}
        {showAgentMessage && (
          <div className="flex justify-end animate-fade-in">
            <div className="relative bg-whatsapp-bg text-whatsapp-text p-3 rounded-lg max-w-[85%] chat-bubble-tail-agent shadow-sm">
              <p className="text-sm leading-relaxed min-h-[1em]">
                {typingText}
                {typingText.length < (demoData?.aiResponse.length || 0) && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
              <div className="flex justify-end items-center gap-1 mt-1">
                <span className="text-[10px] opacity-60">14:33</span>
                <CheckCheck className="w-3 h-3 text-blue-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-4">
        <Button 
          onClick={onNext} 
          disabled={typingText.length < (demoData?.aiResponse.length || 0)}
          className="w-full h-16 text-xl rounded-lg font-bold shadow-lg bg-accent hover:bg-accent/90 transition-all"
        >
          Ver o que isso muda pra mim
        </Button>
      </div>
    </div>
  );
}
