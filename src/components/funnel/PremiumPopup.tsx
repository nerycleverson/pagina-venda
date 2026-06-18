
"use client"

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

interface PremiumPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function PremiumPopup({ isOpen, onClose, onAccept, onDecline }: PremiumPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-none shadow-2xl bg-white p-8 rounded-lg">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <Sparkles className="text-white w-10 h-10" />
        </div>
        
        <DialogHeader className="pt-8 space-y-4">
          <DialogTitle className="text-2xl font-bold text-center text-primary leading-tight">
            Espera! Aproveite esta oferta única
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-foreground">
            Por apenas <b className="text-accent">R$ 9 a mais</b> que o Básico, leve o <b className="text-primary">Premium</b> com sua voz e o dobro de respostas.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-accent/5 p-4 rounded-lg border border-accent/20 my-4 text-center">
          <p className="text-sm text-muted-foreground line-through">De R$ 29,90</p>
          <p className="text-3xl font-bold text-accent">R$ 24,00</p>
          <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">Oferta Exclusiva Agora</p>
        </div>

        <DialogFooter className="flex flex-col gap-3 sm:flex-col pt-4">
          <Button 
            onClick={onAccept}
            className="w-full h-14 text-lg font-bold rounded-lg bg-accent hover:bg-accent/90"
          >
            Quero o Premium por R$ 24
          </Button>
          <Button 
            variant="ghost" 
            onClick={onDecline}
            className="w-full h-12 text-muted-foreground hover:bg-transparent"
          >
            Não, prefiro o Básico
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
