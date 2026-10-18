interface GalleryFavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export function GalleryFavoriteButton({
  isFavorite,
  onToggle,
}: GalleryFavoriteButtonProps) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        type="button"
        onClick={onToggle}
        aria-label={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        className={`w-11 h-11 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer ${
          isFavorite ? "text-error" : "text-on-surface hover:text-error"
        }`}
      >
        <span
          className="material-symbols-outlined text-[24px]"
          style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
          aria-hidden="true"
        >
          favorite
        </span>
      </button>
    </div>
  );
}
