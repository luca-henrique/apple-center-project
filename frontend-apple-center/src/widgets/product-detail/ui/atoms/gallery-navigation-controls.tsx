interface GalleryNavigationControlsProps {
  totalItems: number;
  activeIndex: number;
  onScrollTo: (index: number) => void;
}

export function GalleryNavigationControls({
  totalItems,
  activeIndex,
  onScrollTo,
}: GalleryNavigationControlsProps) {
  if (totalItems <= 1) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => onScrollTo(Math.max(0, activeIndex - 1))}
        disabled={activeIndex === 0}
        aria-label="Imagem anterior"
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md items-center justify-center text-on-surface shadow-md disabled:opacity-30 disabled:pointer-events-none hover:bg-surface transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          chevron_left
        </span>
      </button>

      <button
        type="button"
        onClick={() => onScrollTo(Math.min(totalItems - 1, activeIndex + 1))}
        disabled={activeIndex === totalItems - 1}
        aria-label="Próxima imagem"
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md items-center justify-center text-on-surface shadow-md disabled:opacity-30 disabled:pointer-events-none hover:bg-surface transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          chevron_right
        </span>
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {Array.from({ length: totalItems }).map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            aria-label={`Ir para a foto ${dotIdx + 1}`}
            onClick={() => onScrollTo(dotIdx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === dotIdx ? "w-6 bg-primary" : "w-2 bg-outline/40 hover:bg-outline"
            }`}
          />
        ))}
      </div>
    </>
  );
}
