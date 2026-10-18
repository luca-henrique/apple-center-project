import type { ProductStorageOption } from "@/entities/product/model/types";

interface StorageOptionCardProps {
  storage: ProductStorageOption;
  isSelected: boolean;
  onSelect: (storage: ProductStorageOption) => void;
}

export function StorageOptionCard({
  storage,
  isSelected,
  onSelect,
}: StorageOptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={storage.disabled}
      onClick={() => onSelect(storage)}
      className={`min-h-12.5 p-2.5 rounded-xl border flex flex-col items-center justify-center gap-0.5 text-center transition-all select-none cursor-pointer ${
        storage.disabled
          ? "opacity-40 bg-surface-container-high border-outline-variant/20 cursor-not-allowed"
          : isSelected
          ? "border-primary bg-primary text-on-primary shadow-xs ring-1 ring-primary/20"
          : "border-outline-variant/30 bg-surface-container-low text-on-surface hover:bg-surface-container"
      }`}
    >
      <span className="font-label-md text-label-md font-bold">{storage.label}</span>
      {storage.badge && (
        <span
          className={`text-[10px] font-medium leading-none ${
            isSelected ? "text-on-primary/80" : "text-on-surface-variant"
          }`}
        >
          {storage.badge}
        </span>
      )}
    </button>
  );
}
