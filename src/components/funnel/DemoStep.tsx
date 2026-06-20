"use client"

import React, { useState } from 'react';
import { ArrowRight, BadgeCheck, PlayCircle, Smartphone, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface DemoStepProps {
  onNext: () => void;
}

const VIDEO_SRC = "/videos/demonstracao-docezap.mp4";

export function DemoStep({ onNext }: DemoStepProps) {
  const [videoError, setVideoError] = useState(false);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    if (!started) {
      setStarted(true);
      trackEvent("demo_video_started");
    }
  };

  const handleContinue = () => {
    trackEvent("demo_continued", { video_started: started });
    onNext();
  };

  return (
    <div className="space-y-6 pb-8 pt-3">
      <div className="text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Agora, na prática
        </p>
        <h2 className="text-3xl font-bold leading-tight">
          Veja uma confeiteira usando o DoceZap no atendimento
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Ela mostra a mensagem da cliente, a resposta criada e como usa o resultado no dia a dia.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[310px] overflow-hidden rounded-[30px] border-[6px] border-foreground bg-foreground shadow-2xl shadow-primary/20">
        <div className="aspect-[9/16] w-full bg-[#171717]">
          {videoError ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-white">
              <PlayCircle className="h-14 w-14 text-white/70" />
              <div>
                <p className="font-bold">Vídeo demonstrativo</p>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  Adicione o arquivo demonstracao-docezap.mp4 na pasta public/videos.
                </p>
              </div>
            </div>
          ) : (
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/videos/capa-demonstracao.jpg"
              onPlay={handlePlay}
              onEnded={() => trackEvent("demo_video_completed")}
              onError={() => setVideoError(true)}
              aria-label="Demonstração do DoceZap por uma confeiteira"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Seu navegador não consegue reproduzir este vídeo.
            </video>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: BadgeCheck, text: "Uso real" },
          { icon: Smartphone, text: "Mostra a tela" },
          { icon: Volume2, text: "Explicação curta" }
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="rounded-2xl border bg-white p-3 text-center shadow-sm">
            <Icon className="mx-auto mb-2 h-4 w-4 text-primary" />
            <p className="text-[11px] font-bold leading-tight">{text}</p>
          </div>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        className="h-16 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
      >
        Ver meu plano recomendado
        <ArrowRight className="h-5 w-5" />
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Você pode continuar mesmo sem assistir ao vídeo inteiro.
      </p>
    </div>
  );
}
