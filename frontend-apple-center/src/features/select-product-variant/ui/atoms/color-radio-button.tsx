import type { ProductColor } from "@/entities/product/model/types";

interface ColorRadioButtonProps {
  color: ProductColor;
  isSelected: boolean;
  onSelect: (color: ProductColor) => void;
}

export function ColorRadioButton({
  color,
  isSelected,
  onSelect,
}: ColorRadioButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`Cor ${color.name}`}
      onClick={() => onSelect(color)}
      className={`min-w-11 min-h-11 flex items-center justify-center rounded-full transition-all cursor-pointer ${
        isSelected ? "ring-2 ring-primary ring-offset-2 scale-105" : "hover:scale-105 opacity-80"
      }`}
    >
      <span
        className="w-8 h-8 rounded-full shadow-inner border border-black/10 block"
        style={{ backgroundColor: color.hex }}
      />
    </button>
  );
}
