"use client"

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Crown } from 'lucide-react';

interface PremiumPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function PremiumPopup({ isOpen, onClose, onAccept, onDecline }: PremiumPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-none bg-white p-6 shadow-2xl sm:max-w-[425px] sm:p-8">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent/15 text-accent">
          <Crown className="h-8 w-8" />
        </span>

        <DialogHeader className="space-y-3 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Antes de seguir</p>
          <DialogTitle className="text-center text-2xl font-bold leading-tight text-foreground">
            Por R$ 4,00 a mais, você leva mais que o dobro de respostas
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed text-muted-foreground">
            E ainda configura o DoceZap para responder com o seu jeito de falar.
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 rounded-2xl border-2 border-accent bg-accent/5 p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent">Premium nesta oferta</p>
              <p className="mt-1 text-3xl font-bold text-accent">R$ 23,90</p>
            </div>
            <p className="text-sm text-muted-foreground line-through">R$ 29,90</p>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              "70 respostas em vez de 30",
              "Voz personalizada da sua confeitaria",
              "As mesmas 9 situações liberadas",
              "Acesso por 30 dias, sem renovação"
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter className="flex flex-col gap-3 sm:flex-col">
          <Button onClick={onAccept} className="h-14 w-full rounded-2xl text-base font-bold">
            Comprar Premium
          </Button>
          <Button
            variant="ghost"
            onClick={onDecline}
            className="h-11 w-full text-sm text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            Comprar Básico
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
