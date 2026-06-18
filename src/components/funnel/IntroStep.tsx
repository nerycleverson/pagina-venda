
"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface IntroStepProps {
  onStart: () => void;
}

export function IntroStep({ onStart }: IntroStepProps) {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cake');

  return (
    <div className="text-center space-y-8 py-6">
      <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
        {heroImage && (
          <Image 
            src={heroImage.imageUrl} 
            alt={heroImage.description} 
            fill 
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>

      <div className="space-y-4 px-4">
        <h1 className="text-3xl font-bold text-primary leading-tight">
          Pare de perder vendas no WhatsApp por não saber o que responder
        </h1>
        <p className="text-lg text-muted-foreground">
          Descubra como a IA pode falar com suas clientes no seu lugar e fechar encomendas todos os dias.
        </p>
      </div>

      <div className="px-4 pt-4">
        <Button 
          onClick={onStart} 
          size="lg" 
          className="w-full h-16 text-xl rounded-lg font-bold shadow-lg bg-primary hover:bg-primary/90 transition-transform active:scale-95"
        >
          Descobrir meu perfil
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
        Leva menos de 1 minuto
      </p>
    </div>
  );
}
