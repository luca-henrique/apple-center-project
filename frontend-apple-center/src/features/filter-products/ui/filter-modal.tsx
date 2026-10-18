"use client";

import React from "react";
import { Modal } from "@/shared/ui/modal";
import { Button } from "@/shared/ui/button";

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  conditionFilter: string;
  onConditionChange: (condition: string) => void;
  onResetFilters: () => void;
}

export function FilterModal({
  isOpen,
  onClose,
  conditionFilter,
  onConditionChange,
  onResetFilters,
}: FilterModalProps) {
  const conditions = [
    { id: "all", label: "Todos os Aparelhos", description: "Ver todo o catálogo" },
    { id: "used", label: "Seminovos Certificados", description: "Grade A+ com laudo laboratorial" },
    { id: "new", label: "Novos e Lacrados", description: "Garantia mundial Apple oficial" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filtros de Produtos"
      description="Refine sua busca por condição e garantias"
    >
      <div className="flex flex-col gap-6">
        {/* Condition Section */}
        <div>
          <label className="font-label-lg text-label-lg font-bold text-on-surface block mb-3">
            Condição do Aparelho
          </label>
          <div className="flex flex-col gap-2">
            {conditions.map((item) => {
              const isSelected = conditionFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onConditionChange(item.id)}
                  className={`w-full min-h-[48px] p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all select-none active:scale-[0.99] ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                      : "border-outline-variant/30 hover:bg-surface-container-low text-on-surface"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold">
                      {item.label}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.description}
                    </span>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isSelected ? "text-primary" : "text-outline/40"
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected ? "radio_button_checked" : "radio_button_unchecked"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-surface-container">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onResetFilters}
            className="flex-1"
          >
            Limpar Filtros
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </Modal>
  );
}
