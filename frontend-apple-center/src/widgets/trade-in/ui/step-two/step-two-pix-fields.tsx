import React from "react";
import type { PixKeyType } from "@/features/trade-in/model/trade-in.schema";

interface StepTwoPixFieldsProps {
  pixKeyType: PixKeyType;
  setPixKeyType: (type: PixKeyType) => void;
  pixKey: string;
  setPixKey: (key: string) => void;
}

const PIX_KEY_TYPES: { type: PixKeyType; label: string }[] = [
  { type: "phone", label: "Celular" },
  { type: "cpf", label: "CPF" },
  { type: "email", label: "E-mail" },
  { type: "random", label: "Aleatória" },
];

export function StepTwoPixFields({
  pixKeyType,
  setPixKeyType,
  pixKey,
  setPixKey,
}: StepTwoPixFieldsProps) {
  return (
    <div className="mt-space-md pt-space-sm flex flex-col gap-space-sm border-t border-outline-variant/15">
      <div className="grid grid-cols-4 gap-1.5">
        {PIX_KEY_TYPES.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPixKeyType(item.type);
            }}
            className={`py-1.5 px-2 rounded-lg font-label-sm text-label-sm text-center transition-colors cursor-pointer ${
              pixKeyType === item.type
                ? "bg-primary text-on-primary font-bold shadow-xs"
                : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center px-space-md h-12 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-outline-variant/30">
        <span className="material-symbols-outlined text-secondary text-[20px] mr-2" aria-hidden="true">
          contactless
        </span>
        <input
          type="text"
          value={pixKey}
          onChange={(e) => setPixKey(e.target.value)}
          className="flex-1 font-mono bg-transparent outline-none text-on-surface"
          placeholder="Digite sua chave Pix"
        />
      </div>
    </div>
  );
}
