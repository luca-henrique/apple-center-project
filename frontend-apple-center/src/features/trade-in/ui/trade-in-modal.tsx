"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Modal } from "@/shared/ui/modal";
import { Button } from "@/shared/ui/button";

export interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRADE_IN_MODELS = [
  { id: "iphone-11", name: "iPhone 11", estimatedValue: "R$ 1.200 a R$ 1.500" },
  { id: "iphone-12", name: "iPhone 12", estimatedValue: "R$ 1.800 a R$ 2.200" },
  { id: "iphone-13", name: "iPhone 13", estimatedValue: "R$ 2.400 a R$ 2.800" },
  { id: "iphone-14", name: "iPhone 14", estimatedValue: "R$ 3.000 a R$ 3.500" },
];

export function TradeInModal({ isOpen, onClose }: TradeInModalProps) {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSimulate = () => {
    if (!selectedModel) {
      toast.error("Por favor, selecione o modelo do seu iPhone atual.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Cotação enviada com sucesso!", {
        description: "Um especialista Apple Center entrará em contato via WhatsApp.",
      });
      onClose();
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulador de Trade-in Apple"
      description="Use seu iPhone atual como entrada e pague apenas a diferença."
    >
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-label-md text-label-md font-semibold text-on-surface block mb-2.5">
            Qual é o seu modelo atual?
          </label>
          <div className="flex flex-col gap-2">
            {TRADE_IN_MODELS.map((item) => {
              const isSelected = selectedModel === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedModel(item.id)}
                  className={`w-full min-h-[48px] p-3.5 rounded-xl border flex items-center justify-between text-left transition-all select-none active:scale-[0.99] ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                      : "border-outline-variant/30 hover:bg-surface-container-low text-on-surface"
                  }`}
                >
                  <span className="font-label-md text-label-md font-semibold">{item.name}</span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    Vale até {item.estimatedValue}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/15 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0" aria-hidden="true">
            verified_user
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Avaliação garantida em laboratório técnico. Aparelhos com tela original e sem bloqueios iCloud recebem bonificação especial.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="button" variant="ghost" size="md" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            onClick={handleSimulate}
            className="flex-1"
          >
            Receber Proposta
          </Button>
        </div>
      </div>
    </Modal>
  );
}
